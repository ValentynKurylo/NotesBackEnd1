const router = require('express').Router()
const authController = require('../controllers/auth')
const authMiddleware = require('../middlevares/authMiddleware')

router.post('/login', authController.login)

router.post('/logout',authMiddleware.checkAccessToken, authController.logout)

router.post('/currentUser', authController.getCurrentUser)

module.exports = router