const express = require('express')
const router = express.Router()
const { getMovies, crearMovies, updateMovies, deleteMovies } = require ('../controllers/moviesControllers')

router.get('/', getMovies)
router.post('/', crearMovies)

router.put('/:id', updateMovies)
router.delete('/', deleteMovies)

module.exports = router