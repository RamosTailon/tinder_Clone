const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    //CRIA O TOKEN
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, 'SUPERSENHA')

    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: user._id
    })
}
module.exports = createUserToken