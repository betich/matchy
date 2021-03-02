const mongoose = require('mongoose');

const project = mongoose.Schema({
    info: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    role: String
}, { _id : false });

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
    responses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Response' }],
    projects: [ project ],
    archive: [ project ]
}, options);

const Project = require('./projects');
userSchema.pre('remove', async function() {
    await Project.deleteMany({
        owner: {
            $in: this._id
        }
    });
});

module.exports = mongoose.model("User", userSchema);