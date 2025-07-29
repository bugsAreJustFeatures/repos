const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

function createSession(_passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                
            }
        })
    )
}