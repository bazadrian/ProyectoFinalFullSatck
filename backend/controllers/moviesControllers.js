const asyncHandler = require('express-async-handler')
const Movies = require('../model/moviesModel')
const axios = require('axios');


// Conexión a TMDB
const getPopularMovies = async (page = 1) => {
    const url = `https://api.themoviedb.org/3/movie/popular`;
    const params = {
        language: 'en-US',
        page: page
    };
    const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    };

    // Log de la solicitud HTTP antes de enviarla
    console.log(`Enviando solicitud HTTP GET a TMDB:`);
    console.log(`URL: ${url}`);
    console.log(`Headers: ${JSON.stringify(headers, null, 2)}`);
    console.log(`Params: ${JSON.stringify(params, null, 2)}`);

    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: params
        });

        // Log de la respuesta HTTP después de recibir
        console.log(`Respuesta recibida de TMDB:`);
        console.log(`Status: ${response.status}`);
        console.log(`Data: ${JSON.stringify(response.data, null, 2)}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error; // Rethrow the error to handle it according to your error handling policy
    }
};


const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movies.find({ user: req.user.id })
    res.status(200).json(movies)
})

const crearMovies = asyncHandler(async (req, res) => { if (!req.body.texto) {
    res.status(400)
    throw new Error("Favor de escribir un texto")
}

 const movies = await Movies.create({
    texto: req.body.texto,
    user: req.user.id
}) 

res.status(201).json(movies)
})

const updateMovies = asyncHandler(async (req, res) => {

    const movie = await Movies.findById(req.params.id)

    if (!movie) {
        res.status(400)
        throw new Error('Movie no encontrada')
    } else {

        //verificar que la película que queremos modificar, pertenece al usuario logeado
        if (movie.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Usuario no autorizado')
        } else {
            const movieUpdated = await Movies.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json(movieUpdated)
        }
    }
})

const deleteMovies = asyncHandler(async (req, res) => {

    const movie = await Movies.findById(req.params.id)

    if (!movie) {
        res.status(400)
        throw new Error('Movie no encontrada')
    } else {
        //verificar que la película que queremos modificar, pertenece al usuario logeado
        if (movie.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Usuario no autorizado')
        } else {
            await movie.deleteOne()
            res.status(200).json({ id: req.params.id })
        }
    }
})


module.exports = {
    getMovies,
    crearMovies,
    updateMovies,
    deleteMovies,
    getPopularMovies
}