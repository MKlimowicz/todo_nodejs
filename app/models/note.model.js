const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    ownerId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);