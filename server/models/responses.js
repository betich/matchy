const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project'
    },
    answers: { type: Object }
})

module.exports = mongoose.model("Response", responseSchema);