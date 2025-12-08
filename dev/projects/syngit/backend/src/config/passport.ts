import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { userRepository } from "../persistence/repositories/user.repository";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",    
      passwordField: "password",
      session: false,    
    },
    async (email, password, done) => {
      try {
        const result = await userRepository.findWithLocalAccountByEmail(email);
        if (!result) {
          return done(null, false, { message: "Invalid credentials" });
        }

        const { user, account } = result;

        if (!account.passwordHash) {
          return done(null, false, { message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, account.passwordHash);
        if (!isMatch) {
          return done(null, false, { message: "Invalid credentials" });
        }

        // success
        return done(null, { id: user.id, email: user.email });
      } catch (err) {
        return done(err);
      }
    }
  )
);

// No serializeUser / deserializeUser needed since we're not using passport sessions.

export default passport;
