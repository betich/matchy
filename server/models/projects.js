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

/*
const User = require('./users');
projectSchema.pre('remove', async function() {
    await User.findByIdAndUpdate({
        _id: {
            $in: [this.owner, ...this.workers]
        }
    }, {
        
    }, { useFindAndModify: false }, (err, foundUser) => {
        if (err) throw err;
        else if (!foundUser) {
            res.status(404).send('no project found');
        } else {
            res.status(200).send('update sucessfully');
        }
    })
});
*/

module.exports = mongoose.model("Project", projectSchema);