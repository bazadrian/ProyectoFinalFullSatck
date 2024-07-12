const getMovies = (req, res) => {
    res.status(200).json({ message: 'getMovies'})
}

const crearMovies = (req, res) => {
    res.status(201).json({ message: 'crearMovies'})
}

const updateMovies = (req, res) => {
    res.status(200).json({ message: 'Modificar la movie ${req.params.id}'})
}

const deleteMovies = (req, res) => {
    res.status(200).json({ message: 'Borraste la movie ${req.params.id}'})
}

module.exports = {
    getMovies,
    crearMovies,
    updateMovies,
    deleteMovies
}