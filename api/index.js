const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bcrypt = require('bcryptjs');
const User = require('./model/user_model');

const cors = require('cors-express');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt


const userRoutes = require('./v1/auth');
const postsRoutes = require('./v1/posts');
// const routesV2 = require('./v2/routes');

const port = process.env.PORT || 5000;
const app = express();

corsOptions = {
    allow : {
        origin: '*',
        methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
        headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
    },
    expose :{
        headers : null
    },
    max : {
        age : null
    },
    options : function(req, res, next){
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    },
    specials : {
        powered : null
    }
}    


app.use(cors(corsOptions));

app.use(express.json());


// app.use('/api/v2', routesV2);

// configuration de passport
passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ 'email': username })
            .then((user) => {
            if(!user) {
                return done(null, false, { message: 'Adresse E-mail introuvable.' });
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) {
                    return done(err);
                }
                if(!isMatch) {
                    return done(null, false, { message: 'Mot de passe incorrect.' });
                }
               return done(null, user);
            })
        })
    })
);

// config de JwtOptions
const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY,
}

passport.use(
    new JwtStrategy(JwtOptions, (payload, done) => {
        User.findById(payload.sub, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(!user) {
                return done(null, false, { message: 'utilisateur introuvable...' })
            }
            return done(null, user);
        })
    })
);

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postsRoutes);


app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});

mongoose.connect(process.env.DATABASE_URL);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', ()=>{
    console.log('Database connected'); 
})

