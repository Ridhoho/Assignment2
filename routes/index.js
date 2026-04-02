const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authController = require('../controllers/authController')
const movieController = require('../controllers/movieController')

router.post("/register", authController.register)
router.post("/login", authController.login)
router.get("/movies", authentication, movieController.getMovies)

module.exports = router