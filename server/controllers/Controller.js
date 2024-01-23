const { Op } = require("sequelize")
const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwtoken")
const { User, Chat } = require("../models")

class Controller {

  static async login(req, res, next) {
    try {
      const { username } = req.body
      // console.log(username)

      if (!username || !req.body.password) throw { name: "LoginInputValidationError" }

      let userLogin = await User.findOne({ where: { username } })

      if (!userLogin || !comparePassword(req.body.password, userLogin.password)) {
        throw { name: "LoginValidationError" }
      }

      const payload = {
        id: userLogin.id,
        username: userLogin.username,
        status: userLogin.status
      }

      let access_token = createToken(payload)
      // console.log(access_token)

      res.status(200).json({
        access_token,
        payload
      })

    } catch (error) {
      next(error)
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, status, avatarUrl } = req.body
      await User.create({ username, password, status, avatarUrl })
      res.status(201).json({
        message: "Success create new user"
      })
    } catch (error) {
      next(error)
    }
  }

  static async addMessage(req, res, next) {
    try {
      const { recipient } = req.params
      const { content } = req.body
      const addMessage = await Chat.create({
        content, Sender: req.loginInfo.userId, Recipient: recipient
      })

      res.status(201).json(addMessage)
    } catch (error) {
      next(error)
    }
  }

  static async fetchMessages(req, res, next) {
    try {
      const { recipient } = req.params
      const historyMessages = await Chat.findAll({ where: { [Op.or]: [{ Sender: req.loginInfo.userId, Recipient: recipient }, { Sender: recipient, Recipient: req.loginInfo.userId }] }, order: [["createdAt", "DESC"]] })

      res.status(200).json(historyMessages)
    } catch (error) {
      next(error)
    }
  }
}


module.exports = Controller