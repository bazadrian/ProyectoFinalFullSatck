const express = require ('express')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const connectDB = require('./config/db.js')
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const morgan = require ('morgan')
const cors = require('cors')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))

app.use('/api/movies', require('./routes/moviesRoutes.js'))
app.use('/api/users', require('./routes/usersRoutes'))

app.use(errorHandler)
app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))
