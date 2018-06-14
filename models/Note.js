const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    text: {
        type: String
        // required: 'Text is required'
    }
});

module.exports = mongoose.model('Note', noteSchema);

