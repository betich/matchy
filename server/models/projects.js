const mongoose = require('mongoose');

const options = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
}

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    workers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    tags: [{ type: String }],
    questions: [{ type: String }]
}, options);

module.exports = mongoose.model("Project", projectSchema);