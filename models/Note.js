const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
    noteText: {
        type: String,
        required: 'Text is required'
    }
});

module.exports = mongoose.model('Note', NoteSchema);

