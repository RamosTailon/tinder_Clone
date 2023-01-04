const multer = require('multer')

const path = require('path')

const imageStorage = multer.diskStorage({
    destination: 'public/images/users',
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) { //regex para deixar apenas entrada de .jpg ou .png
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)// se passou pelo if pode dar true
    }
})

module.exports = { imageUpload }