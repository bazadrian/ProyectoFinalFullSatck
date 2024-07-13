const express = require ('express')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const connectDB = require('./config/db.js')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/movies', require('./routes/moviesRoutes.js'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))
