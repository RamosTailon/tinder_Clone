const getToken = (req) => {
    //RETIRAR A PALAVRA TOKEN
    const authHeader = req.headers.authorization
    //TOKEN É UM STRING
    const token = authHeader.split(' ')[1]
    return token
}

module.exports = getToken