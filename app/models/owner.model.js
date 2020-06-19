const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    name: String,
    lastName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Owner', OwnerSchema);