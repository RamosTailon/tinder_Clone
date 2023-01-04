const router = require('express').Router()

const UserController = require('../controllers/UserController')

//MIDDLEWARE
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
//ROTA PROTEGIDA POR TOKEN
router.patch('/edit/:id', verifyToken, imageUpload.array('images'), UserController.editUser)

module.exports = router