const Controller = require('../controllers/Controller')
const router = require('express').Router()

// Test Connection
// router.get('/register', (req, res) => {
//     res.send('this is register')
// })

router.post('/register', Controller.register)
router.post('/login', Controller.login)

// Middleware Auth goes here

router.patch('/editAvatar')
router.get('/posts')
router.post('/posts/add')
router.post('/chat/add')

module.exports = router