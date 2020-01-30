var express = require('express');
var router = express.Router();

const validator = require('validator');
const config = require('config');
const authorConfig = config.get('author');

router.get('/view/:postId', async function(req, res, next) {

    // Validation
    if(req.params.postId === undefined){
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }
    if( !validator.isNumeric(req.params.postId)) {
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }


    let post = await req.db.getPost(req.params.postId);
    console.log(post);

    if(post === undefined) {
        post = {
            title: "Post has been not found"
        }
    }

    res.render('post', post);
});

router.get('/delete/:postId', function(req, res, next) {

    if(!authorConfig) {
        res.redirect('/');
    }


    // Validation
    if(req.params.postId === undefined){
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }
    if( !validator.isNumeric(req.params.postId)) {
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }

    req.db.deletePost(req.params.postId);
    res.redirect('/');
});

router.get('/add', function(req, res, next) {
    if(!authorConfig) {
        res.redirect('/');
    }

    res.render('add_post');
});

router.post('/add', function(req, res, next) {
    if(!authorConfig) {
        res.redirect('/');
    }

    // Validation
    if(req.body.title === undefined || req.body.content === undefined){
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }

    req.db.addPost(req.body.title, req.body.content);
    res.redirect('/');
});

router.get('/edit/:postId', async function(req, res, next) {
    if(!authorConfig) {
        res.redirect('/');
    }
    // Validation
    if(req.params.postId === undefined){
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }
    if( !validator.isNumeric(req.params.postId)) {
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }


    let post = await req.db.getPost(req.params.postId);
    console.log(post);

    if(post === undefined) {
        post = {
            title: "Post has been not found"
        }
    }

    res.render('edit_post', post);
});

router.post('/edit/:postId', function(req, res, next) {
    if(!authorConfig) {
        res.redirect('/');
    }

    // Validation
    if(req.body.title === undefined || req.body.content === undefined || req.body.id === undefined){
        res.render('validator_errors', {msg: "Link is invalid!"});
        return;
    }

    req.db.updatePost(req.body.id, req.body.title, req.body.content);
    res.redirect('/');
});

module.exports = router;
