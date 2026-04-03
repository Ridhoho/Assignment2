const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authController = require('../controllers/authController')
const movieController = require('../controllers/movieController')
const bookmarkController = require('../controllers/bookmarkController')

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/bookmark/:id", authentication, authController.bookmark)
router.get("/movies", authentication, movieController.getMovies)
router.get("/mybookmark", authentication, bookmarkController.getMyBookmark)

module.exports = router