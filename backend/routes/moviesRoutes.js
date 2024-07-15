const express = require('express')
const router = express.Router()
const { getPopularMovies, getMovies, crearMovies, updateMovies, deleteMovies } = require ('../controllers/moviesControllers')
const { protect } = require ('../middleware/authMiddleware')

router.get('/', protect, getMovies)
router.post('/', protect, crearMovies)

router.put('/:id', protect, updateMovies)
router.delete('/:id', protect, deleteMovies)

router.get('/popular', async (req, res) => {
    const page = req.query.page || 1; 
    try {
      const movies = await getPopularMovies(page);
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener películas populares', error: error.message });
    }
  });

module.exports = router