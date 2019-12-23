//import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/staff.model'

const BCRYPT_SALT_ROUNDS = 12;

var JwtStrategy = passportJWT.Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var localStrategy = passportLocal.Strategy;

passport.use('register',
new localStrategy (
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    (username, password, done) => {
        try {
            User.findOne({
                where: {
                    username: username
                }
            }).then(user => {
                if(user !== null) {
                    return done (null, false, {message: 'username already taken'});
                } else {
                    bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(
                        hashedPassword => {
                            User.create({ username, password: hashedPassword}).then(
                                user=> {
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



passport.use (
    'login',
    new localStrategy (
        {
            usernameField:'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            try {
                User.findOne({
                    where:{
                        username: username
                    }
                }).then(user => {
                    if(user ===null) {
                        return done(null, false, {message: 'bad username'})
                    } else {
                        bcrypt.compare(password, user.password).then(response => {
                            if(response) {
                                return done(null, user);
                            }
                            return done(null, false, {message: 'passwords do not match'})
                        })
                    }
                })

            } catch (err) {
                done(err);
            }
        }
    )
)


var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'tasmanianDevil';

// var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
   // console.log('payload received', jwt_payload);
    // usually this would be a database call:
    // var user = users[_.findIndex(users, {id: jwt_payload.id})];
    // if (user) {
    //   next(null, user);
    // } else {
    //   next(null, false);
    // }
 //   next({error:'token expiry'}, false)
 // });
  
  //passport.use(strategy);

  passport.use(
      'jwt',
      new JwtStrategy(jwtOptions, (jwt_payload, done) => {
          try {
              User.findOne({
                  where: {
                      username: jwt_payload.id
                  }
              }).then (user => {
                  if(user) {
                      done(null, user);
                  } else {
                      done(null, false)
                  }
              })

          } catch (err) {
              done(err);
          }
      })
  )

// var app = express();
// app.use(passport.initialize());



export const userLogin = (req,res, next) => {
passport.authenticate('login', (err, user, info) => {
    if(err) {
        console.log('error----', err)
    }
    if(info) {
        console.log('message info---', info.message)
        res.send(info.message)
    } else {
        req.logIn((user, err) =>{
            User.findOne({
                where: {
                    username: user.username
                }
            }).then(user => {
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.status(200).send({
                    auth: true,
                    token: token,
                    message: 'user found & logged in'
                })
            })
        })
    }
})(req,res, next);



    // if(req.body.name && req.body.password){
    //     var name = req.body.name;
    //     var password = req.body.password;
    //   }

    //   var user = users[_.findIndex(users, {name: name})];
    //   if( ! user ){
    //     res.status(401).json({message:"no such user found"});
    //   }
    // let user ={}
    // user.id = 'virender_maira'
    
     // if(user.password === password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      //  var payload = {id: user.id};
      //  var token = jwt.sign(payload, jwtOptions.secretOrKey);
      //  res.json({message: "ok", token: token});
    //  } else {
   //     res.status(401).json({message:"passwords did not match"});
     // }

}

export const checkAuth = (req,res) => {
     passport.authenticate('jwt', { session: false }),
     res.send('success')
}


  
  app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
    res.json({message: "Success! You can not see this without a token"});
  });
  


