
const passport = require("passport");
const passportJWT = require("passport-jwt");
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../constant');
const switchConnection = require('../databaseConnection/switchDb');

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var localStrategy = passportLocal.Strategy;

let dbName;

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'staffContact',
            passwordField: 'staffPassword',
            session: false
        },
        async (staffContact, staffPassword, done) => {
            try {
                const Staff = await switchConnection(dbName, "Staff");
                const staff = await Staff.findOne({ staffContact });
                const isPasswordMatch = await bcrypt.compare(staffPassword, staff.staffPassword)
                if (!staff) {
                    return done(null, false);
                } else if (isPasswordMatch) {
                    return done(null, dbName);
                }
                return done(null, false);
            } catch (err) {
                console.log('err---', err)
                return done(err, false);
            }
        }
    )
)

passport.use(
    'checkInMaster',
    new localStrategy(
        {
            usernameField: 'branchContact',
            passwordField: 'staffPassword',
            session: false
        },
        async (branchContact, staffPassword, done) => {
            try {
                const MasterInfo = await switchConnection("gym-e-master", "MasterInfo");
                const masterInfo = await MasterInfo.findOne({ branchContact });
                if (!masterInfo) {
                    return done(null, false);
                } else {
                    dbName = masterInfo.newDbName;
                    return done(null, masterInfo)
                }
            } catch (err) {
                console.log('error-----', err);
                return done(null, false);
            }
        }
    ))


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = JWT_SECRET;

passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            const Staff = await switchConnection(jwt_payload.newDbName, "Staff");
            const staff = await Staff.findById(jwt_payload._id);
            if (!staff) {
                return done(null, false);
            }
            return done(null, { newDbName: jwt_payload.newDbName, loginId: jwt_payload._id });
        } catch (err) {
            return done(err, false);
        }
    })
)


const checkAuth = passport.authenticate('jwt', { session: false });
const userLogin = passport.authenticate('login', { session: false });
const checkMaster = passport.authenticate('checkInMaster', { session: false });

module.exports = {
    checkAuth,
    userLogin,
    checkMaster
};
