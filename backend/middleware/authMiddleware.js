const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //verificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener del token los datos del usuario
            req.user = await User.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporciono un token')
    }
})

module.exports = { protect }