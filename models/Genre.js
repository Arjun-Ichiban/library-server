
const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    genre: {
        type: String,
        required: true
    }
});

module.exports = Genre = mongoose.model('genre', GenreSchema);