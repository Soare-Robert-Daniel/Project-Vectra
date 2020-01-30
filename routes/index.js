var express = require('express');
var router = express.Router();

const config = require('config');
const authorConfig = config.get('author');

/* GET home page. */
router.get('/', async function (req, res, next) {

    let posts = await req.db.getPosts();
    console.log(posts);
    res.render('index', {
        title: 'Project-Vectra',
        author: authorConfig,
        posts: posts
    });
});

module.exports = router;
