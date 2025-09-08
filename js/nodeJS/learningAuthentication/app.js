require("dotenv").config()

const path = require("node:path")
const { Pool } = require("pg")
const express = require("express")
const app = express()
const session = require("express-session")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs")

//make pool to host users
const pool = new Pool({
    connectionString: process.env.LOCAL_CONNECTION_STRING
})

//tell express where ejs files are
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// session ---- MAIN FOCUS OF THIS LESSON --- //
app.use(session({  // defines and "announces" the aspects that i want to modify, change and how i want them to act.
    secret: "cats",
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.session()) //  actually initialises a session 
app.use(express.urlencoded({ extended: false }))

// reads the db and checks whether or not we can go to the next page or not, depending if we're authenticated
passport.use(
    new localStrategy(async (username, password, done) => {
        try {
            const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [username])
            const user = rows[0]
            const match = await bcrypt.compare(password, user.password);

            if (!user) {
                return done(null, false, { message: "Incorrect username" })
            }

            if (!match) {
                return done(null, false, { message: "incorrect password" });
            };

            return done(null, user)
            
        } catch (err) {
            return done(err)
        }
    })
);

// session id, allows user to logged in rather than only logging in on the form page via cookies, which store the sid (session id)
passport.serializeUser((user, done) => { // "announces" and defines what bit of data from the db we want to use to locate user and distinguish them
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => { // uses the "announced" and defined piece of data and then finds that in the db, if it exists and actually puts it into the connect.sid via req.user
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        const user = rows[0];
        
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// routes
//index
app.get("/", (req, res) => {res.render("index", { user: req.user })})

// sign up form 
app.get("/sign-up", (req, res) => {
    res.render("sign-up-form")
})

// hashing with bcrypt, also main part of lesson since you should never store user's passwords in plain text. 
app.post("/sign-up", async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2);`, [
            req.body.username,
            hashedPassword,
        ])
        res.redirect("/")
    } catch (err) {
        return next(err)
    }
})

// actually authenticate when logging in
app.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}));

// log out
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

//make localhost server
app.listen(3000, () => {console.log("Listening on 3000")});

