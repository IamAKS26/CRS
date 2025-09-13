const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    stream: {                     // ✅ new field
        type: String,
        required: false           // optional for now
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
