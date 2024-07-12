const getMovies = (req, res) => {
    res.status(200).json({ message: 'getMovies'})
}

module.exports = {
    getMovies
   // crearMovies,
    // updateMovies,
    // deleteMovies
}