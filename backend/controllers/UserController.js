//IMPORTS
const User = require('../models/User') // MODEL

const bcrypt = require('bcrypt') // criptografa a senha e gera um token 

const jwt = require('jsonwebtoken') // lê o token

//HELPERS
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

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

		/************** */
		if (!images) {
			res.status(422).json({ message: "Você deve adicionar ao menos uma foto" })
			return
		}

		let imageList = []
		images.map((image) => {
			imageList.push(image.filename)
		})

		/************** */

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
			images: imageList,
			bio: bio,
			city: city,
			nation: nation,
			interest: interest
		})

		try {
			//.save MÉTODO DO MONGOOSE
			const newUser = await user.save()
			//res.status(201).json({ message: "usuário criado!", newUser })
			await createUserToken(newUser, req, res)


		} catch (err) {
			res.status(500).json({ message: err })
		}




	}
	static async login(req, res) {
		const { email, password } = req.body
		if (!email) {
			res.status(422).json({
				message: "O e-mail é obrigatório!"
			})
			return
		}
		if (!password) {
			res.status(422).json({
				message: "A senha é obrigatória!"
			})
			return
		}

		const user = await User.findOne({ email: email })

		if (!user) {
			res.status(422).json({
				message: "Não há usuário cadastrado com esse e-mail!"
			})
			return
		}

		const checkPassword = await bcrypt.compare(password, user.password)

		if (!checkPassword) {
			res.status(422).json({ message: "Senha incorreta!" })
			return
		}

		await createUserToken(user, req, res)
	}

	static async checkUser(req, res) {
		let currentUser;
		// console.log(req.headers.authorization)

		if (req.headers.authorization) {

			const token = getToken((req))
			const decoded = jwt.verify(token, 'SUPERSENHA')

			currentUser = await User.findById(decoded.id)
			currentUser.password = undefined
		} else {
			currentUser = null
		}

		res.status(200).send(currentUser)
	}

	static async getUserById(req, res) {
		const id = req.params.id
		//.select() ELIMINA ALGUNS CAMPOS NA HORA DO QUERY
		const user = await User.findById(id).select("-password")

		if (!user) {
			res.status(422).json({ message: "Usuário não encontrado!" })
			return
		}
		res.status(200).json({ user })
	}

	static async editUser(req, res) {
		const id = req.params.id

		//VERIFICAR SE O USUÁRIO EXISTE
		const token = getToken(req)
		const user = await getUserByToken(token)

		const { name, email, password, confirmpassword, age, phone, bio, city, nation, interest } = req.body

		//VALIDAÇÕES
		//---------------
		if (!name) {
			res.status(422).json({ message: "O nome é obrigatório" })
			return
		}
		user.name = name
		//---------------
		if (!email) {
			res.status(422).json({ message: "O e-mail é obrigatório" })
			return
		}

		//VERIFICANDO SE O USUÁRIO EXISTE
		const userExists = await User.findOne({ email: email })
		if (user.email !== email && userExists) {
			res.status(422).json({ message: "Email já cadastrado, por favor use outro!" })
			return
		}
		user.email = email
		//---------------
		if (password != confirmpassword) {
			res.status(422).json({ message: "As senhas não conferem!" })
			return
		} else if (password === confirmpassword && password != null) {
			//CRIAR A SENHA PARA ATUALIZA-LA
			const salt = await bcrypt.genSalt(12)
			const passwordHash = await bcrypt.hash(password, salt) // SUPER SENHA

			user.password = passwordHash
		}
		//---------------
		if (!age) {
			res.status(422).json({ message: "A idade é obrigatória" })
			return
		}
		user.age = age
		//---------------
		if (!phone) {
			res.status(422).json({ message: "O telefone é obrigatório" })
			return
		}
		user.phone = phone
		//+++++++++++++++++++++++++++++++


		const updateData = {}
		let images = req.files
		if (images <= 0) {
			res.status(422).json({ message: 'A imagem é obrigatória!' })
			return
		} else {
			updateData.images = []
			images.map((image) => {
				updateData.images.push(image.filename)
			})
		}
		let imageList = []
		images.map((image) => {
			imageList.push(image.filename)
		})
		user.images = imageList

		//---------------
		if (!bio) {
			res.status(422).json({ message: "A descrição é obrigatória" })
			return
		}
		user.bio = bio
		//---------------
		if (!city) {
			res.status(422).json({ message: "A cidade é obrigatória" })
			return
		}
		user.city = city
		//---------------
		if (!nation) {
			res.status(422).json({ message: "O Estado é obrigatório" })
			return
		}
		user.nation = nation

		user.interest = interest
		//++++++++++++++++++++++++++
		try {
			//RETORNA OS DADOS ATUALIZADOS DO USUÁRIO
			await User.findOneAndUpdate(
				{ _id: user._id },//filtro id
				{ $set: user }, //o dado que será atualizado
				{ new: true }
			)
			res.status(200).json({ message: "Usuário atualizado com sucesso!" })
		} catch (err) {
			res.status(500).json(err)
			return
		}

	}

	static async liked(req, res) {
		const id = req.params.id

		//VERIFICAR SE O USUÁRIO EXISTE
		const token = getToken(req)
		const user = await getUserByToken(token)

		//VALIDATION
		if (id.toString() == (user._id.toString())) {
			res.status(422).json({
				message: 'Você não pode dar Match em si mesmo!',
			})
			return
		}


		//NÃO PODE FAZER DELIVERED 2 VEZES NA MESMA PESSOA

		if (user.delivered.some((item) => item.id == id)) {
			res.status(422).json({
				message: 'Você já deu gostei nessa pessoa!',
			})
			return
		}


		const anotherUser = await User.findById(id)

		//verificação para ver se já não recebeu match

		let condition = false
		user.received.map((item) => {
			if (item.id == id) {
				condition = true
			}
		})

		//VERIFICAR A POSIÇÃO DO USUÁRIO NA LISTA
		const list = anotherUser.delivered.findIndex((item) => item.id.toString() == user._id.toString())

		if (anotherUser.delivered?.[0]) {
			if (Object.keys(anotherUser.delivered[0]).includes('status')) {
				anotherUser.delivered[list]['status'] = true
			}
		}


		user.delivered.push(
			{
				id: anotherUser._id,
				image: anotherUser.images[0],
				name: anotherUser.name,
				phone: anotherUser.phone,
				...(condition ? { status: true } : { status: false }),
				iWasReject: false
			}
		)


		anotherUser.received.push(
			{
				id: user._id,
				image: user.images[0],
				name: user.name,
				reject: false
			}
		)



		try {

			await User.findOneAndUpdate(
				{ _id: user._id },//filtro id
				{ $set: user }, //o dado que será atualizado
				{ new: true }
			)
			await User.findOneAndUpdate(
				{ _id: anotherUser._id },//filtro id
				{ $set: anotherUser }, //o dado que será atualizado
				{ new: true }
			)


			res.status(200).json({ message: `Você gostou de ${anotherUser.name}` })
		} catch (err) {

			res.status(500).json(err)
			return

		}
	}

	static async getAll(req, res) {

		const allUsers = await User.find().sort('-createdAt')

		res.status(200).json({
			users: allUsers
		})

	}

	static async getLoves(req, res) {

		//VERIFICAR SE O USUÁRIO EXISTE
		const token = getToken(req)
		const user = await getUserByToken(token)

		const matchList = await User.find(user._id)

		const listDelivered = matchList[0].delivered
		res.status(200).json({
			myMatch: listDelivered
		})
	}

	static async getCrush(req, res) {

		//VERIFICAR SE O USUÁRIO EXISTE
		const token = getToken(req)
		const user = await getUserByToken(token)

		const matchList = await User.find(user._id)

		const listReceived = matchList[0].received

		res.status(200).json({
			myCrush: listReceived
		})
	}

	static async rejectUser(req, res) {
		const id = req.params.id

		//VERIFICAR SE O USUÁRIO EXISTE
		const token = getToken(req)
		const user = await getUserByToken(token)

		const anotherUser = await User.findById(id)

		//VERIFICAR A POSIÇÃO DO USUÁRIO NA LISTA
		const anotherList = anotherUser.delivered.findIndex((item) => item.id.toString() == user._id.toString())

		if (anotherUser.delivered?.[0]) {
			if (Object.keys(anotherUser.delivered[0]).includes('status')) {
				anotherUser.delivered[anotherList]['iWasReject'] = true
			}
		}

		const userList = user.received.findIndex((item) => item.id.toString() == anotherUser.id)


		if (user.received?.[0]) {
			user.received[userList]['reject'] = true
		}


		try {

			await User.findOneAndUpdate(
				{ _id: user._id },//filtro id
				{ $set: user }, //o dado que será atualizado
				{ new: true }
			)
			await User.findOneAndUpdate(
				{ _id: anotherUser._id },//filtro id
				{ $set: anotherUser }, //o dado que será atualizado
				{ new: true }
			)


			res.status(200).json({ message: `Rejeitou ${anotherUser.name}` })
		} catch (err) {

			res.status(500).json(err)
			return

		}


	}

}