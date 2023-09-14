const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../model/user_model');
const Post = require('../model/posts_model');

//passport.authenticate('jwt', { session: false }),
router.post('/add',  async (req, res) =>{
    // res.send('Add new Post');
    try {
        const newPost = await new Post(req.body);
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req,res) =>{
    // res.send('Get all Posts');
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
    
});

router.get('/:id', async (req,res) =>{
    // res.send('Get One Post by id - id= ' + req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.patch('/update/:id', async (req,res) =>{
    // res.send('Update One Post by id - id= ' + req.params.id);

    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await Post.updateOne({$set: req.body});
            const updated = await Post.findById(post._id);
            res.status(200).json(updated);
        } else {
            res.status(403).json('CE post ne vous appartient pas');
        }
        /*
            on pourrait également ecrire

            const updated = await Post.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json(updated);

            if(!updated) {
                res.status(400).json('bad-request - Document non trouvé');
            }
        */
    } catch(err) {
        res.status(500).json(err);
    }
});

router.delete('/delete/:id', async (req,res)=>{
    // res.send('Delete One Post by id - id= ' + req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await Post.delete();
            res.status(200).json('Supprimé');
        }
    } catch(err) {
        res.status(500).json(err)
    }
});


module.exports = router;