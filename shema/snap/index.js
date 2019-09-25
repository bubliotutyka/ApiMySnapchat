const mongoose = require('mongoose');

const SnapSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    from: {
        type: String,
    },
    to: {
      type: String,
    },
    duration: {
        type: Number,
    },
    seen: {
        type: Boolean,
    },
});

module.exports = mongoose.model('snaps', SnapSchema, 'snaps');