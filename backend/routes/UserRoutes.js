const router = require('express').Router()

const UserController = require('../controllers/UserController')

//MIDDLEWARE
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)

router.patch('/edit/:id', verifyToken, imageUpload.array('images'), UserController.editUser)//ROTA PROTEGIDA POR TOKEN

//ROTA DE MATCH
router.patch('/liked/:id', verifyToken, UserController.liked)

//RETORNAR OS TODOS USUÁRIOS
router.get('/', UserController.getAll)
router.get('/match/loves', verifyToken, UserController.getLoves)
router.get('/match/crush', verifyToken, UserController.getCrush)


module.exports = router