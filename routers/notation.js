const router = require('express').Router()

const notationControler = require('../controllers/notation')
const authMiddleware = require('../middlevares/authMiddleware')

router.get('/', notationControler.getAllNotation)

router.get('/userId/:userId', notationControler.getNotationByUserId)

router.post('/', notationControler.postNotation)

router.get('/:id', notationControler.getById)

router.put('/:id', notationControler.putNotation)

router.delete('/:id', notationControler.DeleteNotation)

module.exports = router