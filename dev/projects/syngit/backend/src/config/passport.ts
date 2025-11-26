import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {prisma} from  "../persistence/Pr"

passport.use(new LocalStrategy({usernameField:'email', passwordField:'password'}, async(email, password, done){
    try{
        const account = await 
    }
    catch{

    }
}))