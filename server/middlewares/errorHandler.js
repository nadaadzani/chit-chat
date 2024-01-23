const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal server error'

    if (err.name === 'SequelizeValidationError') {
        status = 400
        message = err.errors.map(el => {
            return el.message
        })
    }

    if (err === 'EmptyCredentials') {
        status = 400
        message = `Username and password can't be empty`
    }

    if (err === 'EmptyUsername') {
        status = 400
        message = `Username can't be empty`
    }

    if (err === 'EmptyPassword') {
        status = 400
        message = `Password can't be empty`
    }

    if (err === 'InvalidCredentials') {
        status = 401
        message = 'Invalid username/password'
    }

    console.log(err)
    res.status(status).json({
        message
    })
}

module.exports = errorHandler