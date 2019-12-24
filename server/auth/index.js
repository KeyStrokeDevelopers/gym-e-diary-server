//import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import Staff from '../models/staff.model'
import { createStaff } from '../models/staff.model';
import { JWT_SECRET } from '../constant'

const BCRYPT_SALT_ROUNDS = 12;

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var localStrategy = passportLocal.Strategy;

passport.use('register',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            const staff = createStaff();
            try {
                Staff.findOne({
                    where: {
                        username: username
                    }
                }).then(user => {
                    if (user !== null) {
                        return done(null, false, { message: 'username already taken' });
                    } else {
                        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(
                            hashedPassword => {
                                Staff.create({ username, password: hashedPassword }).then(
                                    user => {
                                        return done(null, user);
                                    }
                                )
                            }
                        )
                    }
                })
            } catch (err) {
                done(err);
            }
        }
    ))


passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'empContact',
            passwordField: 'empPassword',
            session: false
        },
        async (empContact, empPassword, done) => {
            const staff = createStaff();
            try {
                const staff = await Staff.findOne({ empContact });
                if (!staff) {
                    return done(null, false);
                } else if (!staff.authenticateStaff(empPassword)) {
                    return done(null, false);
                }
                return done(null, staff);
            } catch (err) {
                console.log('err---', err)
                return done(err, false);
            }
        }
    )
)


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = JWT_SECRET;

passport.use(
    'jwt',
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        const staff = createStaff();
        try {
            const staff = await Staff.findById(payload._id);

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
export const userLogin = passport.authenticate('login', { session: false });



