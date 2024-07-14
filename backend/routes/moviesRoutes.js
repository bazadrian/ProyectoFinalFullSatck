const express = require('express')
const router = express.Router()
const { getMovies, crearMovies, updateMovies, deleteMovies } = require ('../controllers/moviesControllers')
const { protect } = require ('../middleware/authMiddleware')

router.get('/', protect, getMovies)
router.post('/', protect, crearMovies)

router.put('/:id', protect, updateMovies)
router.delete('/:id', protect, deleteMovies)

module.exports = router