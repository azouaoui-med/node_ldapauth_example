const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const passportConfig = require('./config/passport');

// create express instance server
const app = express();
const routes = express.Router();

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setup static path
app.use(express.static(path.join(__dirname, 'public/')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/')));

// setup middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'ldapAuth' }));
app.use(passport.initialize());
app.use(passport.session());

// check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

// authentication method
const authenticate = (req, res, next) => {
    passport.authenticate('ldapauth', (err, user, info) => {

        if (err) {

            return next(err);
        }
        if (!user) {
            return res.render(path.join(__dirname, 'views/login'), {
                message: "Username or password incorrect!"
            });
        }
        req.logIn(user, (error) => {
            if (error) {
                return next(err);
            }
        });
        res.redirect('/');

    })(req, res, next);
};


// set up routes
routes.route('/').get(isAuthenticated, (req, res) => {
    res.render(path.join(__dirname, 'views/index'));
});

routes
    .route('/login')
    .get((req, res) => {
        res.render(path.join(__dirname, 'views/login'));
    })
    .post(authenticate);

app.use('/', routes);

// run express server
app.listen(3000, () => {
    console.log(console.log(`Listening on port 3000 ....`));
});
