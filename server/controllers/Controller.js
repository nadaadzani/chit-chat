const { Op } = require("sequelize")
const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwtoken")
const imagekit = require("../utils/imageKit")

const { User, Chat, Post } = require("../models")

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
      const { username, password } = req.body
      await User.create({ username, password })
      res.status(201).json({
        message: "Success create new user"
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { status } = req.body
      await User.update({ status }, { where: { id: req.loginInfo.userId } })

      res.status(200).json({ message: "Success update status" })
    } catch (error) {
      next(error)
    }
  }

  static async showProfile(req, res, next) {
    try {
      const profile = await User.findByPk(req.loginInfo.userId)

      res.status(200).json(profile)
    } catch (error) {
      next(error)
    }
  }

  static async showPosts(req, res, next) {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
        },order: [["createdAt", "DESC"]],
      });

      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  }

  static async addPost(req, res, next) {
    try {
      // user id dari re qlogin info
      const { title, content } = req.body

      await Post.create({ title, content, UserId: req.loginInfo.userId })

      res.status(201).json({
        message: "Success create post"
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
      const historyMessages = await Chat.findAll({ where: { [Op.or]: [{ Sender: req.loginInfo.userId, Recipient: recipient }, { Sender: recipient, Recipient: req.loginInfo.userId }] }, order: [["createdAt", "ASC"]] })

      res.status(200).json(historyMessages)
    } catch (error) {
      next(error)
    }
  }

  static async uploadImage(req, res, next) {
    try {

      let foundUser = await User.findByPk(req.loginInfo.userId)

      if (!foundUser) throw { name: "NotFound", id }

      if (!req.file) throw { name: "imgUrlValidationError" }


      const imageInBase64 = req.file.buffer.toString("base64")

      // if (imageInBase64 === "") throw { name: "imgUrlValidationError" }

      // console.log(req.file)

      const result = await imagekit.upload({
        file: imageInBase64,
        fileName: req.file.originalname,
        tags: [`avatar`]
      })

      // console.log(result)

      await User.update({ avatarUrl: result.url }, {
        where: { id: req.loginInfo.userId }
      })

      res.status(200).json({
        message: "Upload success",
        result
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateLikes(req, res, next) {
    try {
      const { id } = req.params
      const post = await Post.findByPk(id)
      await post.increment({ likes: 1 })

      res.status(200).json({
        message: "Liked"
      })
    } catch (error) {
      next(error)
    }
  }

  static async showUsers(req,res,next) {
    try {
      const users = await User.findAll({
        attributes: {
          exclude:["password"]
        }
      })

      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  static async showUserById(req,res,next) {
    try {
      const {id} = req.params
      const user = await User.findByPk(id)

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }


}


module.exports = Controller