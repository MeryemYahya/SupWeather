const mongoose = require('mongoose');
var User = require("../models/user");
const bcrypt = require('bcryptjs');
const validator = require('validator');
const saltRounds = 10;

module.exports = {
    addUser: (req, res) => {
        User.findOne(
            { 'email': req.body.login },
            (err, user) => {
                if (!user) {
                    if (req.body.login != null && req.body.password != null && req.body.passwordC != null) {


                        if (req.body.password == req.body.passwordC) {

                            if (validator.isEmail(req.body.login) && validator.isLength(req.body.password, { min: 6, max: 12 })) {
                                var newUser = new User({
                                    email: req.body.login,
                                    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(saltRounds))
                                }).save();
                                res.send("Done");
                            }
                            else res.status(500).send("error")
                        }

                        else res.status(500).send('non identique')
                    }
                    else res.status(500).send('empty fields')
                }
                if (user) {
                    res.status(500).send("utilisé")
                }
            }
        )

    },

    login: (req, res) => {
        if (req.body.login != null && req.body.password != null) {
            User.findOne(
                { 'email': req.body.login },
                (err, user) => {
                    if (user) {
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                            req.session.login = req.body.login
                            res.send('aut')
                        }
                        else res.status(500).send('mdp incorrect')
                    }
                    else res.status(500).send('non trouvé')
                }
            )
        }
        else res.status(500).send("empty fields")
    },

    getCities: (req, res) => {
        User.findOne(
            { 'email': req.params.login },
            { 'cities': 1 },
            (err, cities) => {
                if (cities) res.json(cities)
                else res.status(500).send('error')
            }
        )
    },

    addCities: (req, res) => {
        var city = {
            name: req.body.name,
            id: req.body.id
        }

        if (req.body.login != null) {
            User.findOne(
                { 'email': req.body.login, 'cities.id': req.body.id },
                { 'cities': 1 },
                (err, result) => {
                    if (!result) {
                        User.findOneAndUpdate({
                            'email': req.body.login
                        }, {
                            $push: {
                                'cities': city
                            }
                        }, {
                            useFindAndModify: false
                        }).exec((error, result) => {
                            if (result) res.send('added');
                            else res.status(500).send('error')
                        })

                    }

                    if (result) res.status(500).send('existed')

                }
            )
        } else res.status(500).send('login required')

    },

    deleteCities: (req, res) => {
        var city = {
            name: req.body.name,
            id: req.body.id
        }
        if (req.body.login != null) {
            User.findOneAndUpdate({
                'email': req.body.login
            }, {
                $pull: {
                    'cities': city
                }
            }, {
                useFindAndModify: false
            }).exec(function (error, result) {
                if (result) res.send('removed')
                else res.status(500).send('error')
            })

        } else res.status(500).send('login required')
    },
}

