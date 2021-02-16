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

projectSchema.pre('remove', async function() {
    const User = require('./users');
    try {
        // find workers, owners
        await User.find({
            _id: {
                $in: [this.owner, ...this.workers]
            }
        })
        .populate({path: "projects"})
        .exec((err, foundUsers) => {
            // foundUsers = [ User, User, User]
            if (err) throw err;
            else if (!foundUsers) throw 'no user found';
            else {
                let projectsToRemove = [];
                let projects = foundUsers.map((user) => user.projects);
                // projects = [ [Project, Project], [Project] ]

                projects.forEach((project, useridx) => {
                    let toRemove = [];
                    for (var i = 0; i < project.length; i++) {
                        // check for projects in 'User' that match current _id
                        if (project[i].projectid.equals(this._id)) {
                            toRemove.push(i);
                        }
                    }
                    
                    if (toRemove.length > 0) {
                        // add indexes of projects that will be removed
                        projectsToRemove.push({ useridx:useridx, projectidx: toRemove });
                    }
                });

                projectsToRemove.forEach((toRemove) => {
                    // toRemove = { useridx: 0, toRemove: [3,4,2] }
                    let useridx = toRemove.useridx;
                    
                    toRemove.projectidx.forEach((idx) => {
                        // move projects to 'archive'
                        foundUsers[useridx].archive.push(foundUsers[useridx].projects[idx]);
                        // and remove them from 'projects'
                        foundUsers[useridx].projects = foundUsers[useridx].projects.slice(0, idx)
                                                        .concat(foundUsers[useridx].projects.slice(idx+1))
                    })

                    foundUsers[useridx].save((err, updatedUser) => {
                        if (err) throw err;
                        console.log(`updated ${updatedUser.username} sucessfully`);
                    });
                });
            }
        })
    } catch (err) {
        if (err) console.error(err);
    }
});

/* USING UPDATE (Doesn't move deleted projects to archive)
// find workers, owners
    await User.updateMany({
        _id: {
            $in: [this.owner, ...this.workers]
        }
    }, {
        $pull: {
            projects: { projectid: this._id }
        }
    }, (err, updateStatus) => {
        if (err) throw err;
        else if (updateStatus.n === 0) throw 'no user found';
        else {
            // and remove the project out of the 'projects' field
            console.log(`updated user sucessfully:`, updateStatus);
        }
    })
*/

module.exports = mongoose.model("Project", projectSchema);