const express = require("express")
const router = express.Router()
const Controller = require('../controllers/Controller')
const authentication = require("../middlewares/authentication")


router.get('/', (req, res) => {
  res.send('AWKOEAKWEOAKWOEKAWOEKAWOEKAWOEKAWOEKAWOE!')
})
// router.get("/home", (req, res) => {
//   res.send("test")
// })

// router.post("/register", UserController)
router.post("/login", Controller.login)
router.use(authentication)

router.post("/chat/:recipient", Controller.addMessage)
router.get("/chat/:recipient", Controller.fetchMessages)


module.exports = router