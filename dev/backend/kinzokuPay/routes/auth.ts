import express from "express";
import axios from "axios";
import { UserModel } from "../db";
import { signjwt } from "../utils/tokens";
import throwError from "../utils/error";

const authRouter = express.Router();

// Google OAuth Redirect
authRouter.get("/google", (req, res) => {
  const redirectURI =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=email%20profile`;

  res.redirect(redirectURI);
});

// Google OAuth Callback
authRouter.get("/google/callback", async (req, res) => {
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
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { email, name, picture } = userInfo.data;
    const nameParts = (name || "User").split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    console.log("successful");
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
      name,
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
        window.opener.postMessage(
          { success: true },
          "${process.env.FRONTEND_URL}"
        );
        window.close();
      </script>
    </body>
  </html>
`);
  } catch (err: any) {
    console.error("Google OAuth Error:", err.response?.data || err.message);
    throwError("Couldn't Sign In!", 401);
  }
});

// GitHub OAuth Redirect
authRouter.get("/github", (req, res) => {
  const redirectUri =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&redirect_uri=${process.env.GITHUB_REDIRECT_URI}` +
    `&response_type=code` +
    `&scope=user:email`;

  res.redirect(redirectUri);
});

// GitHub OAuth Callback
authRouter.get("/github/callback", async (req, res) => {
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
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userInfo = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { name, avatar_url } = userInfo.data;

    let email = userInfo.data.email;
    if (!email) {
      const emailRes = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const primaryEmail = emailRes.data.find(
        (e: any) => e.primary && e.verified
      );
      email = primaryEmail?.email;
    }

    if (!email) {
      throwError("No email found from GitHub", 401);
    }

    const nameParts = (name || "User").split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

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
      name,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    // Example: after JWT cookie is set
    res.send(`
  <html>
    <body>
      <script>
        window.opener.postMessage(
          { success: true },
          "${process.env.FRONTEND_URL}"
        );
        window.close();
      </script>
    </body>
  </html>
`);
  } catch (err: any) {
    console.error("GitHub OAuth Error:", err.response?.data || err.message);
    throwError("Couldn't Sign In!", 401);
  }
});

export default authRouter;
