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
            url: 'ldap://10.6.3.1:389',
            bindDN: 'sigLdap sigLdap',
            bindCredentials: 'Sonelgaz.1',
            searchBase: 'OU=SONELGAZ,DC=grp-sonelgaz,DC=sng',
            searchFilter: '(sAMAccountName={{username}})'
        }
    };

    passport.use(new LdapStrategy(OPTS));
}

module.exports = passortConfig();
