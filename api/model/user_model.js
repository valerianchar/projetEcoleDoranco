const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        min: 6,
    }

},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', UserShema);