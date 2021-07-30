const {User} = require('../models');

function format(user) {
    const {id, username} = user;
    return {
        id,
        username,
        accessToken: user.generateToken()
    }
}

module.exports = {
    register: (req, res, next) => {
        User.register({
            username: req.body.username,
            password: req.body.password
        })
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch(err=>{
            next(err)
        })
    },
    login: (req, res) => {
        User.authenticate (req.body)
        .then(user => {
            res.status(200).json(
                format(user)
            )
        })
        .catch(err => {
            console.log(err);
        })
    },
    whoami: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser)
    }
       
}

