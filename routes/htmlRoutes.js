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
            if (headline && url && summary && picture) {
                db.Article.create({
                    headline: headline,
                    url: url,
                    summary: summary,
                    picture: picture
                }, (err, inserted) => {
                    if (err) console.error(err);
                    else {
                        console.log(inserted);
                        // res.json(inserted);
                    }
                });
            }
        });
    });
    // res.send('scrape complete');

});

router.get('/', (req, res) => {
    db.Article.find({}).sort({_id: -1})
        .then(dbArticles => {
            const articleInfoObj = {
                article: dbArticles
            };
            // console.log(articleInfoObj);
            res.render('home', articleInfoObj);
        })

});
router.get('/api/notes/:id', (req, res) => {
    console.log(`id= : ${req.params.id}`)
    db.Article.find({_id: req.params.id})
        .populate('notes')
        .then(dbArticle => {
            console.log(dbArticle[0].notes);
            res.json(dbArticle);
        }).catch( err => {
            console.log(`Error is: ${err}`);
    })
});
router.post('/api/notes', (req, res) => {
    console.log(`id = ${req.body._id}`);
    console.log(`text = ${req.body.noteText}`);
    db.Note.create({noteText: req.body.noteText})
        .then(dbNote => {
            return db.Article.findOneAndUpdate({_id: req.body._id}, {$push: {notes: dbNote._id}}, {new: true})
        })
        .then(dbArticle => {
            res.json(dbArticle);
        }).catch(err => {
        res.json(err);
    });

})



router.put('/api/article/:_id', (req, res) => {
    db.Article.update(
        {
            _id: req.params._id
        },
        {
            $set: {'saved': req.body.saved}
        }, (err, updated) => {
            if (err) console.error(err);
            else {
                console.log(updated);
                res.json(updated);
            }
        })
});

router.delete('/api/articles/:_id', (req, res) => {
    console.log(`body: ${JSON.stringify(req.body)}`)
    const ObjectId = require('mongoose').Types.ObjectId;
    const query = { article_id: new ObjectId(req.body.article_id), note_id: new ObjectId(req.body.note_id)};
    console.log(`Query: ${query}`);
    db.Note.findByIdAndRemove({_id: query.note_id})
        .then( removedNote =>{
            console.log(`Removed: ${JSON.stringify(removedNote)}`);
            db.Article.findOneAndUpdate(
                {_id: query.article_id},
                {$pull: {notes: query.note_id}},
                {new: true})
                .then( noteRemovedFromArticle => {
                    console.log(`note from article: ${JSON.stringify(noteRemovedFromArticle.notes)}`);
                })

        }).catch( (err) => {
            if(err) console.log(err);
    });
});

router.get('/saved', (req, res) => {
    db.Article.find({}).sort({_id: -1}).then(dbArticles => {
        const articleObjInfo = {
            article: dbArticles
        };
        res.render('saved', articleObjInfo);

    });
});

module.exports = router;