const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const router = express.Router();

const db = require('../models');
router.get('/api/scrape', (req, res) => {
    console.log('route working');
    request('https://www.npr.org/sections/news/', (error, response, html) => {
        if (error) return console.log(error);
        console.log('request working?');
        const $ = cheerio.load(html);

        $('.item-info').each((i, element) => {
            // console.log(`${element}, element`);
            const headline = $(element).children('.title').first().text();
            const url = $(element).children('.title').children('a').attr('href');

            const summary = $(element).children('.teaser').first().text();
            const picture = $(element).prev().children('.imagewrap').children('a').children('img').attr('src');

            console.log(`headline: ${headline},
                url: ${url},
                summary: ${summary},
                picture: ${picture}`);
            if(headline && url && summary && picture){
                db.Article.create({
                    headline: headline,
                    url: url,
                    summary: summary,
                    picture: picture
                }, (err, inserted) => {
                    if(err) console.error(err);
                    else console.log(inserted);
                });
            }
        });
    });
    // res.send('scrape complete');

});

router.get('/', (req, res) => {
    db.Article.find({}).sort({_id: -1})
        .then( dbArticles => {
            const articleInfoObj = {
                article: dbArticles
            };
            // console.log(articleInfoObj);
            res.render('home', articleInfoObj);
        })

});
router.get('/api/scrape', (req, res)=>{

});

router.put('/api/article:_id', (req, res) => {
    db.Article.update(
        {
        _id: req.params._id
    },
        {
            $set:{'saved': req.body.saved}
        }, (err, updated) => {
            if (err) console.error(err);
            else console.log(updated);
        })
    });

router.delete('/api/article:_id', (req, res) =>{
    db.Article.deleteOne({_id: req.params._id})
});

router.get('/saved', (req, res) => {
    res.render('saved');
});
module.exports = router;