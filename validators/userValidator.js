const Joi = require("joi")

module.exports = {
    postUser: Joi.object().keys({
        name: Joi.string().required().min(2).max(30),
        email: Joi.string().email(),
        password: Joi.string().min(4).max(64).required(),
        role: Joi.string().allow('user', 'admin', 'worker')
    })
}