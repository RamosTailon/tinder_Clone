//IMPORTS
const User = require('../models/User') // MODEL

const bcrypt = require('bcrypt') // criptografa a senha e gera um token 

const jwt = require('jsonwebtoken') // lê o token

//HELPERS

//START CLASS
module.exports = class UserController {
	static async register(req, res) {
		const { name, email, password, confirmpassword, age, phone, images, bio, city, nation, interest } = req.body

		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório!" })
			return
		}
		if (!email) {
			res.status(422).json({ message: "O e-mail é obrigatório" })
			return
		}
		if (!password) {
			res.status(422).json({ message: "A senha é obrigatória" })
			return
		}
		if (!confirmpassword) {
			res.status(422).json({ message: "A confirmação de senha é obrigatória" })
			return
		}

		if (password !== confirmpassword) {
			res.status(422).json({ message: "A senha e confirmação de senha precisam ser iguais" })
			return
		}

		if (!age) {
			res.status(422).json({ message: "A idade é obrigatória" })
			return
		}
		if (!phone) {
			res.status(422).json({ message: "O telefone é obrigatório" })
			return
		}
		if (!images) {
			res.status(422).json({ message: "Você deve adicionar ao menos uma foto" })
			return
		}
		if (!bio) {
			res.status(422).json({ message: "Você deve adicionar uma descrição na bio" })
			return
		}
		if (!city) {
			res.status(422).json({ message: "A cidade é obrigatória" })
			return
		}
		if (!nation) {
			res.status(422).json({ message: "O estado é obrigatório" })
			return
		}

		//VERIFICAÇÃO SE O USUÁRIO EXISTE
		const userExists = await User.findOne({ email: email }) //se esse usuário for preenchido é porque tem o mesmo email

		if (userExists) {
			res.status(422).json({ message: "Por favor, utilize outro email" })
			return
		}

		//CRIAR A SENHA
		const salt = await bcrypt.genSalt(12)

		const passwordHash = await bcrypt.hash(password, salt) //super senha

		//CRIAR O USUÁRIO
		const user = new User({
			name: name,
			email: email,
			password: passwordHash,
			phone: phone,
			age: age,
			images: images,
			bio: bio,
			city: city,
			nation: nation,
			interest: interest
		})

		try {
			//.save MÉTODO DO MONGOOSE
			const newUser = await user.save()
			res.status(201).json({
				message: "usuário criado!",
				newUser
			})
			// await createUserToken(newUser, req, res)

		} catch (err) {
			res.status(500).json({ message: err })
		}




	}

}