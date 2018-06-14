const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
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
    save: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

module.exports = mongoose.model('Article', articleSchema);