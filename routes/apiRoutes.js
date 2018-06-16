// const express = require('express');
// const request = require('request');
// const cheerio = require('cheerio');
// const router = express.Router();
//
// const db = require('../models');
// router.post('/api/scrape', (req, res) => {
//     console.log('route working');
//     if (req.body.headline) {
//         db.Article.insertMany({
//             headline: req.body.headline,
//             url: req.body.url,
//             summary: req.body.summary,
//             picture: req.body.picture
//         }, (err, inserted) => {
//             if (err) console.error(err);
//             else console.log(inserted);
//         });
//     }
//     res.send('scrape complete');
//
// });
//
// module.exports = router;