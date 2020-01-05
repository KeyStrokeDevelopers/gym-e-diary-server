
import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import Staff from '../models/staff.model';
import MasterInfo from '../models/masterInfo.model';
import { connectedToDatabase } from '../databaseConnection';
import { JWT_SECRET } from '../constant';

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var localStrategy = passportLocal.Strategy;


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
                const staff = await Staff.findOne({ staffContact });
                const isPasswordMatch = await bcrypt.compare(staffPassword, staff.staffPassword)
                if (!staff) {
                    return done(null, false);
                } else if (isPasswordMatch) {
                    return done(null, staff);
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
            usernameField: 'gymContact',
            passwordField: 'staffPassword',
            session: false
        },
        async (gymContact, staffPassword, done) => {
            try {
                let isDbConSuccess = await connectedToDatabase('gym-e-master');
                if (!isDbConSuccess) {
                    return done(null, false)
                }
                const masterInfo = await MasterInfo.findOne({ gymContact });
                if (!masterInfo) {
                    return done(null, false);
                } else {
                    /**
                    * Connect to database of user
                    */
                    isDbConSuccess = await connectedToDatabase(masterInfo.newDbName);
                    if (!isDbConSuccess) {
                        return done(null, false)
                    }
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
            const staff = await Staff.findById(jwt_payload._id);
            if (!staff) {
                return done(null, false);
            }
            return done(null, staff);
        } catch (err) {
            return done(err, false);
        }
    })
)



export const checkAuth = passport.authenticate('jwt', { session: false });
export const
    userLogin = passport.authenticate('login', { session: false });
export const checkMaster = passport.authenticate('checkInMaster', { session: false });



