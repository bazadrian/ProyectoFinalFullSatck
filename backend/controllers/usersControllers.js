const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const register = asyncHandler(async (req, res) => {

    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
        res.status(400)
        throw new Error("Por favor proporciona todos los datos")
    }

    //verificar que el usuario no exista
    const userExiste = await User.findOne({ email })

    if (userExiste) {
        res.status(400)
        throw new Error("Ese usuario ya existe")
    } else {
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //creamos el usuario
        const user = await User.create({
            nombre,
            email,
            password: hashedPassword
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                nombre: user.nombre,
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error("Datos incorrectos")
        }
    }
})

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    //verificar q el usuario exista
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            nombre: user.nombre,
            email: user.email,
            token: generarToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales Incorrectas')
    }
})

//generar el token
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const data = (req, res) => {
    res.status(200).json(req.user)
}

module.exports = {
    login,
    register,
    data
}