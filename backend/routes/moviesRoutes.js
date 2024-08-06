const express = require('express')
const router = express.Router()
const { getPopularMovies, getMovies, crearMovies, updateMovies, deleteMovies, getOneMovieById } = require ('../controllers/moviesControllers')
const { protect } = require ('../middleware/authMiddleware')

router.get('/', protect, getMovies)
router.post('/', protect, crearMovies)

router.put('/:id', protect, updateMovies)
router.delete('/:tmdbId', protect, deleteMovies)


// Pide las peliculas populares de TMDB
router.get('/popular', async (req, res) => {
    const page = req.query.page || 1; 
    try {
      const movies = await getPopularMovies(page);
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener películas populares', error: error.message });
    }
  });
// Pide la info de la pelicula por ID de TMDB
  router.get('/movie/:id', protect, async (req, res) => {
    const { id } = req.params;
    try {
      const movieId = await getOneMovieById(id);
      console.log("Movie data:", movieId); // Muestra los datos obtenidos
      if (movieId) {
        res.status(200).json(movieId);
      } else {
        res.status(404).json({ message: 'Pelicula no encontrada'})
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        res.status(404).json({ message: 'Película no encontrada en TMDB', error: error.message });
      } else {
        res.status(500).json({ message: 'Error al obtener una película', error: error.message });
      }
    }
  })

module.exports = router