const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');

function passortConfig() {

    // Stores user in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    //Retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    const OPTS = {
        server: {
            url: 'ldap://localhost:389',
            bindDN: 'cn=root',
            bindCredentials: 'secret',
            searchBase: 'ou=passport-ldapauth',
            searchFilter: '(sAMAccountName={{username}})'
        }
    };

    passport.use(new LdapStrategy(OPTS));
}

module.exports = passortConfig();
