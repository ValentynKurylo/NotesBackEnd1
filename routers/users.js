const router = require('express').Router()
const userController = require('../controllers/users')
const userMiddleware = require('../middlevares/UserMiddleware')
const authMiddleware = require('../middlevares/authMiddleware')
const fileMiddleware = require('../middlevares/fileMiddleware')
router.get('/', userController.getAllUsers)

router.get('/:id', userController.getUserById)

router.get('/ByName/:name',authMiddleware.checkAccessToken, userController.getUserByName)

router.post('/', userMiddleware.checkUserMiddleware, userMiddleware.checkIsEmailExist, userController.postUser)

router.put('/:id', userController.putUser)

router.delete('/:id', userController.deleteUser)
/*
router.get('/u', userController.getUsers)

router.post('/u', userController.postU)
*/

router.post('/photo', fileMiddleware.fileMiddleware, userController.postPhoto)
module.exports = router