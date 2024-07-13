const express = require('express')
const router = express.Router()
const { register, login, data } = require ('../controllers/userControllers')

router.post('/login', login)
router.post('/register', register)

router.get('/data', data)


module.exports = router