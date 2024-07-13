const asyncHandler = require('express-async-handler')
const Movies = require('../model/moviesModel')


const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movies.find({ user: req.user.id })
    res.status(200).json(movies)
})

const crearMovies = asyncHandler(async (req, res) => {

    if (!req.body.texto) {
        res.status(400)
        throw new Error("Favor de escribir un texto")
    }

     const movies = await Movies.create({
        texto: req.body.texto,
        user: req.user.id
    }) 

    res.status(201).json(movies)
})

const updateMovies = (req, res) => {
    res.status(200).json({ message: `Modificar la movie ${req.params.id}`})
}

const deleteMovies = (req, res) => {
    res.status(200).json({ message: `Borraste la movie ${req.params.id}`})
}

module.exports = {
    getMovies,
    crearMovies,
    updateMovies,
    deleteMovies
}