const BlogPost = require('../models/BlogPost.js')
const User = require('../models/User.js');
const path = require('path')
module.exports = (req, res) => {
    User.findById(req.session.userId)
        .then((user) => {
            req.body.username = user.username;
        });
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..',
        'public/img', image.name),
        async (error) => {
            await BlogPost.create({
                ...req.body,
                image: '/img/' + image.name
            })
            res.redirect('/')
        })
}
