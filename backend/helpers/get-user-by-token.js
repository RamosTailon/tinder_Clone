const jwt = require('jsonwebtoken')

const User = require('../models/User')

const getUserByToken = async (token) => {
    //SE NAO TIVER TOKEN NEM ENTRA
    if (!token) {
        return res.status(401).json({ message: "Acesso negado!" })
    }
    const decoded = jwt.verify(token, 'SUPERSENHA');

    const userId = decoded.id

    const user = await User.findOne({ _id: userId })

    return user
}

module.exports = getUserByToken