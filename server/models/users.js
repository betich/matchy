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
    name: { first: String, last: String },
    birthday: {
        day: { type: Number, required: true },
        month: { type: Number, required: true },
        year: { type: Number, required: true }
    },
    experiences: [{ type: Object }],
    login: {
        email: { login: String, password: String }
    },
    interests: [{ type: String }],
    projects: [ project ],
    archive: [ project ]
}, options);

userSchema.virtual('fullName').get(function() {
    return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model("User", userSchema);