const mongoose = require('mongoose');

const project = {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    role: String
};

const options = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: String,
    hash: String,
    salt: String,
    birthday: {
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true }
    },
    experiences: { type: Object },
    email: { type: String, required: true, unique: true },
    interests: [{ type: String }],
    projects: [ project ],
    archive: [ project ]
}, options);

module.exports = mongoose.model("User", userSchema);