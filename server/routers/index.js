const Controller = require('../controllers/Controller');
const upload = require('../helpers/multer');
const router = require('express').Router()
const middlewareUpload = upload.single("avatarUrl");

// Test Connection
// router.get('/register', (req, res) => {
//     res.send('this is register')
// })

router.post('/register', Controller.register)
router.post('/login', Controller.login)

// Middleware Auth goes here

router.patch('/editAvatar', middlewareUpload, Controller.editAvatar)
router.get('/posts')
router.post('/posts/add')
router.post('/chat/add')

module.exports = router