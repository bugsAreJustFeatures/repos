//pretend this is just app.js, then export it with the parameter of passport, then pretend im just using it now, import at the start and then delete at end, then also dont put it all into a single function yet, leave that till the end so that i can use intellisense etc.s

// const passport = require("passport"); // delete when done
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const queries = require("../database/queries");
const { Cookie } = require("express-session");

function createSession(passport) { // change to just passport 
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await queries.getUsername(username);
                const match = await bcrypt.compare(password, user.password);

                if (!user) {
                    return done(null, false, { message: "incorrect usernames entered." });

                } else if (!match) {
                    return done(null, false, { message: "incorrect password entered." });
                } else {
                    return done(null, user);

                }
            } catch (err) {
                return done(err)
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await queries.getUserById(id);

            done(null, user)
        } catch (err) {
            done(err)
        }
    });

}

module.exports = createSession