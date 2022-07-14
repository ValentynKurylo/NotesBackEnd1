const router = require('express').Router()

const friendController = require('../controllers/friend')
const authMiddleware = require('../middlevares/authMiddleware')

router.get('/:userId', friendController.getMyFriends)

router.post('/', friendController.postFriend)

router.delete('/:id', friendController.deleteFriend)

module.exports = router