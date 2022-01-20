const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userControllers');


router.post('/singup', (req, res) => {
  controllers.addUser(req, res)
})

router.post('/login', (req, res) => {
  controllers.login(req, res)
})

router.post('/logout', (req, res) => {
  session = req.session;
  session.destroy(err => {
    res.send('logout');
  });
})

router.get('/cities/:login', (req, res) => {
  controllers.getCities(req, res)
})

router.post('/cities', (req, res) => {
  controllers.addCities(req, res)
})

router.put('/cities', (req, res) => {
  controllers.deleteCities(req, res)
})

module.exports = router;

