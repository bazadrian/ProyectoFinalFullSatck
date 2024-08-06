const asyncHandler = require('express-async-handler')
const Movies = require('../model/moviesModel')
const Favorite = require('../model/favModel')
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

    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: headers,
            params: params
        });

        // Log de la respuesta HTTP después de recibir
        /* console.log(`Respuesta recibida de TMDB:`);
        console.log(`Status: ${response.status}`);
        console.log(`Data: ${JSON.stringify(response.data, null, 2)}`); */

        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error; // Rethrow the error to handle it according to your error handling policy
    }
}

// Obtener 1 película por ID

    const getOneMovieById = async (id) => {
    console.log(`Fetching movie with ID: ${id}`);
    const url = `https://api.themoviedb.org/3/movie/${id}`;
    const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: headers,
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error; // Rethrow the error to handle it according to your error handling policy
    } 
}

const getMovies = asyncHandler(async (req, res) => {
    // Buscar todos los favoritos del usuario actual
    const favorites = await Favorite.find({ user: req.user.id });

    // Verificar si el usuario tiene favoritos
    if (favorites.length === 0){
        return res.status(404).json({ message: 'No tienes Películas' });
    }

    // Extraer los IDs de las películas de los objetos de favoritos
    const movieIds = favorites.map(fav => fav.movie);

    // Buscar detalles de las películas usando los IDs obtenidos
    const movies = await Movies.find({ '_id': { $in: movieIds } });

    // Verificar si se encontraron películas
    if (movies.length === 0){
        return res.status(404).json({ message: 'Películas no encontradas' });
    }

    res.status(200).json(movies);
});

const crearMovies = asyncHandler(async (req, res) => {
    const { tmdbId, title, poster_path } = req.body
    const userId = req.user._id
    //buscamos la película si existe
    let movie = await Movies.findOne({tmdb_id: tmdbId })
    if (!movie) {
        // si no existe la crea
        movie = await Movies.create({
            tmdb_id: tmdbId,
            title: title,
            poster_path: poster_path
        })
    }
    // verificamos si el usuario ya la tiene en sus favoritos
 //     console.log(Favorite);  Debería mostrar la función del modelo de Mongoose
    const existingFavorite = await Favorite.findOne({ user: userId, movie: movie._id });
    if (existingFavorite) {
        return res.status(400).json({ message: 'Esta película ya está en tus favoritos' });
    }

    // Crear entrada en favoritos
    const favorite = await Favorite.create({ user: userId, movie: movie._id, tmdb_id: tmdbId });
    res.status(201).json(favorite);
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
    const { tmdbId } = req.params; // Asumiendo que pasas tmdb_id como parámetro

    // Buscar la entrada de película favorita relacionada con el usuario y el tmdb_id
    const favorite = await Favorite.findOne({ 
        tmdb_id: Number(tmdbId), 
        user: req.user._id 
    });

    if (!favorite) {
        res.status(404).json({ message: 'Película favorita no encontrada' });
    } else {
        // Eliminar la película favorita
        await Favorite.findByIdAndDelete(favorite._id);
        res.status(200).json({ message: 'Película favorita eliminada con éxito', tmdbId: tmdbId });
    }
});



module.exports = {
    getMovies,
    crearMovies,
    updateMovies,
    deleteMovies,
    getPopularMovies,
    getOneMovieById 
}