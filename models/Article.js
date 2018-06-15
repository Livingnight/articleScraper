const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
    headline: {
        type: String,
        unique: true,
        required: 'Headline is required'
    },
    url: {
        type: String,
        require: 'URL is required'
    },
    summary: {
        type: String,
        require: 'Summary is required'
    },
    picture: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

module.exports = mongoose.model('Article', ArticleSchema);