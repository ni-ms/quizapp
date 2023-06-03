const express = require('express');
const ViteExpress = require('vite-express');

//login stuff
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require("cors");
const SQLiteStore = require('connect-sqlite3')(session);


//database stuff
const Database = require('better-sqlite3');
const app = express();
const db = new Database( './database.db', {
    verbose: console.log
});
const saltRounds = 10;

db.serialize();
const stmt1 = db.prepare(`CREATE TABLE IF NOT exists users (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL,
 password TEXT NOT NULL
 )`);
stmt1.run();

const stmt2 = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`);

// Check if the user table is empty and add a default user
const row = db.prepare('SELECT count(*) as count FROM users').get();
if (!row.count)
    stmt2.run('admin', bcrypt.hashSync('admin', saltRounds));



//LOGIN AND SESSION STUFF
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 604800000,
        secure: false,
        sameSite: 'none'
    },
    store: new SQLiteStore({
        db : 'sessions.db',
        table: 'sessions',
    }),
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new LocalStrategy(async function (username, password, done) {
        try {
            const stmt = db.prepare(`SELECT * FROM users WHERE username = ?`);
            const row = stmt.get(username);
            console.log(row.password)
            if (!row) {
                return done(null, false, { message: "Incorrect username." });
            }
            const res = await bcrypt.compare(password, row.password);
            if (res) {
                return done(null, row);
            } else {
                return done(null, false, { message: "Incorrect password." });
            }
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id);
    if(!row) {
        return done(null, false);
    }
    if(err){
        return done(err);
    }
    return done(null, row);

});


function loginActions(req, res, next) {
    passport.authenticate(
        "local",
        (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            req.login(user, (err) => {
                console.log("Login session established");
                if (err) {
                    return next(err);
                }
                return res.status(200).json(user);
            });
        }
    )(req, res, next);
}


app.post("/api/login", loginActions);

app.get('/api/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ message: 'User not authenticated' });
    }
});

app.get('/api/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            req.status(200).clearCookie('connect.sid', {path: '/'}).json({message: 'User logged out successfully'});
            res.redirect('/');
        }
    });
});

ViteExpress.listen(app,3000, () => {
    console.log('Server started on port 3000');
});
