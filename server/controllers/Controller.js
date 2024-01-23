const { comparePass } = require('../helpers/bcrypt.js')
const { User } = require('../models')
const { signToken } = require('../helpers/token.js')

class Controller {
    static async register(req, res, next) {
        try {
            const { username, password } = req.body
            const user = await User.create({ username, password })
            const { password: userPassword, ...data } = user.dataValues
            res.status(201).json({
                message: 'Successfully registered',
                data
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { username, password } = req.body
            if (!username && !password) throw 'EmptyCredentials'
            if (!username) throw 'EmptyUsername'
            if (!password) throw 'EmptyPassword'

            const user = await User.findOne({ where: { username } })
            if (!user) throw 'InvalidCredentials'
            const validUser = comparePass(password, user.password)
            if (!validUser) throw 'InvalidCredentials'

            const payload = {
                id: user.id,
                username: user.username
            }

            const access_token = signToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {
            next(error)
        }
    }

    static async editAvatar(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async readPosts(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async addPost(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async addMessage(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller