const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        contact: {type: String, required: true},
        password: {type: String, required: true},
        college: {type: mongoose.Schema.Types.ObjectId, ref: 'College'},
        registeredBy: {type: String, default: 'NA'},
        role: {type: String, enum:['admin', 'spoc', 'student'], required: true}
    },
    { timestamps: true }
);

// userSchema.plugin(uniqueVal);
userSchema.plugin(uniqueVal, {
    type: 'mongoose-unique-validator',
    message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('User', userSchema, 'users');