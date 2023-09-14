const mongoose = require('mongoose');

const PostsShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }

},
{
    timestamps: true
}
)

module.exports = mongoose.model('Posts', PostsShema);