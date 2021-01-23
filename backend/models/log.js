const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
    {
        category: { type: String, required: true, enum: ['user-logs', 'paper-logs'] },
        message: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Log', logSchema, 'logs');