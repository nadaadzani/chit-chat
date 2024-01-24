const express = require("express")
const router = express.Router()
const Controller = require('../controllers/Controller')
const authentication = require("../middlewares/authentication")
const upload = require("../utils/multer")
const middlewareUpload = upload.single("file")


// router.get('/', (req, res) => {
//   res.send('AWKOEAKWEOAKWOEKAWOEKAWOEKAWOEKAWOEKAWOE!')
// })
// router.get("/home", (req, res) => {
//   res.send("test")
// })

router.post("/register", Controller.register) //v
router.post("/login", Controller.login) //v
router.use(authentication)

router.get("/profile", Controller.showProfile) //v
router.patch("/status", Controller.updateStatus) //v

router.patch("/avatar", middlewareUpload, Controller.uploadImage) //v

router.get("/posts", Controller.showPosts) //v
router.post("/posts", Controller.addPost) //v
router.post("/likes/:id", Controller.updateLikes) //v

router.get("/users", Controller.showUsers)
router.get("/users/:id", Controller.showUserById)

router.post("/chat/:recipient", Controller.addMessage) //v
router.get("/chat/:recipient", Controller.fetchMessages) //v



module.exports = router