const express = require('express');
const router = express.Router();

const { check, validationResult, body} = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../model/user_model');
const Post = require('../model/posts_model');
const RefreshToken = require('../model/refreshToken_model');

router.post('/register', 
    [
        body('email').isEmail().withMessage('Adresse Email invalide!'),
        body('password').isLength({ min: 6 }).withMessage('Mot de passe doit contenir au moins 6 carateres'),
        body('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('Les mots de passe ne correspondent pas!');
            }
            return true;
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        User.findOne({ email })
        .then((user) => {
            if(user) {
                return res.status(400).json({ messsage: "L'utilisateur existe déjà" });
            }
            // Si l'utilisateur n'existe pas déjà, on le crée

            const newUser = new User({ email, password });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }

                    newUser.password = hash;
                    newUser.save()
                    .then((user) => {
                        res.status(201).json({ message: 'Inscription réussie!', user });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({ message: 'Erreur lors de l\'enregistrement' });
                    })
                })
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: 'Erreur lors de la recherche de l\'utilisateur.' });
        })
})

router.post('/login', passport.authenticate('local', { session: false }), async (req,res) => {

    const token = jwt.sign({ sub: req.user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    
    const refreshToken = jwt.sign({ sub: req.user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    const RefreshModel = new RefreshToken({ token: refreshToken });

    try {
        await RefreshModel.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur lors de l'enregistrement du refreshToken" });
    }

    res.cookie('refreshToken', refreshToken, {httpOnly: true});
    res.json({ token: token });
    // res.json({ token: token, refresh: refreshToken });
})

router.post('/refresh-token', async (req, res) => {
    // on récup le refresh token du cookie
    const refreshToken = req.cookies.refreshToken;

    // on verifie sa validité
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    //cas ou il est invalide
    if(!decoded) {
        return res.status(401).json({ message: 'refresh token invalid' });
    }

    // on essaie de le trouver dans la DB
    const existingToken = await RefreshToken.findOne({ token: refreshToken });
    
    // Sion le trouve pas
    if(!existingToken) {
        return res.status(401).json({ message: 'Refresh token non trouvé' });
    }
    // On regénère un nouveau Token
    const user = { _id: decoded.sub };
    const token = jwt.sign({ sub: user._id }, process.env.TOKEN_SECRET, { expiration: '1h' });

    // on le renvoi au middleware de l'app
    res.json({ token: token });

})

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ message: 'Déconnexion réussie' });
})

module.exports = router;