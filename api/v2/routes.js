const express = require('express');
const router = express.Router();


router.post('/add', (req, res) => {
    res.send("New method post");
});

router.get('/all', (req, res) => {
    res.send('Get all');
});


router.get('/one/:id', (req, res) => {
    res.send('Get by id = ' + req.params.id);
});


router.patch('/update/:id', (req, res) => {
    res.send('Update one by id = ' + req.params.id);
});

router.delete('/delete/:id', (req, res) => {
    res.send('Delete by id = ' + req.params.id);
});


module.exports = router;