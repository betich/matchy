const mongoose = require('mongoose');
const User = require('./models/users');
const Project = require('./models/projects');

async function seedDB() {
    await User.deleteMany({});
    await Project.deleteMany({});

    for(const seed of seeds) {
        let user = await User.create(seed);
        let project = await Project.create({
            name: `planty_${seed.name.first}`,
            description: 'yes.',
            owner: '600d9f30619919499828bc49',
            workers: [
                '600d9f30619919499828bc4c'
            ],
            tags: ['explicit'],
            questions: ['why?']
        });
        user.currentProjects.push(project._id);
        user.save();
    }
};

const seeds = [
    {
        username: 'betichx',
        name: { first: 'thee', last: 'pnt' },
        birthday: {
            day: 9,
            month: 11,
            year: 2004
        },
        experiences: [{
            school: 'school'
        }],
        login: {
            basic: { password: 'betich' }
        },
        interests: ['you', 'you2']
    },
    {
        username: 'betichx2',
        name: { first: 'thee2', last: 'pnt' },
        birthday: {
            day: 1,
            month: 11,
            year: 2004
        },
        experiences: [{
            school: 'schoodl'
        }],
        login: {
            basic: { password: 'betich2' }
        },
        interests: ['you3', 'you2']
    }
]

module.exports = seedDB;