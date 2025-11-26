import axios from "axios";
import { UserModel } from "../models/user.model";
import { signjwt } from "../utils/tokens";
import throwError from "../utils/helperFunction";

function parseName(name: string) {
  const parts = (name || "User").split(" ");
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") || "" };
}

// Google OAuth redirect
export const googleRedirect = (req, res) => {
  const redirectURI =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=email%20profile`;

  res.redirect(redirectURI);
};

// Google OAuth callback
export const googleCallback = async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const { email, name, picture } = userInfo.data;
    const { firstName, lastName } = parseName(name);

    let user = await UserModel.findOne({ userName: email });

    if (!user) {
      user = await UserModel.create({
        userName: email,
        firstName,
        lastName,
        password: null,
        avatar: picture,
        oauthProvider: "google",
      });
    }

    const token = signjwt({
      id: user._id.toString(),
      email: user.userName,
      firstName,
      lastName,
      avatar: picture,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ success: true }, "${process.env.FRONTEND_URL}");
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error("Google OAuth Error:", err.response?.data || err.message);
    throwError("Couldn't Sign In!", 401);
  }
};

// GitHub OAuth redirect
export const githubRedirect = (req, res) => {
  const redirectUri =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=user:email`;

  res.redirect(redirectUri);
};

// GitHub OAuth callback
export const githubCallback = async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        grant_type: "authorization_code",
      },
      { headers: { Accept: "application/json" } }
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfo = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { name, avatar_url } = userInfo.data;

    let email = userInfo.data.email;
    if (!email) {
      const emailRes = await axios.get("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const primaryEmail = emailRes.data.find(
        (e: any) => e.primary && e.verified
      );
      email = primaryEmail?.email;
    }

    if (!email) throwError("No email found from GitHub", 401);

    const { firstName, lastName } = parseName(name);

    let user = await UserModel.findOne({ userName: email });
    if (!user) {
      user = await UserModel.create({
        userName: email,
        firstName,
        lastName,
        password: null,
        avatar: avatar_url,
        oauthProvider: "github",
      });
    }

    const token = signjwt({
      id: user._id.toString(),
      email: user.userName,
      firstName,
      lastName,
      avatar: avatar_url,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ success: true }, "${process.env.FRONTEND_URL}");
            window.close();
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error("GitHub OAuth Error:", err.response?.data || err.message);
    throwError("Couldn't Sign In!", 401);
  }
};
