const validator = require('../validators/userValidator')
const connection = require('../models/mysql')

module.exports = {
    checkUserMiddleware: (req, res, next) => {
        try {
            const {error} = validator.postUser.validate(req.body)
            if (error) {
                throw new Error(error.details[0].message)
            }
            next()
        } catch (e) {
            next(e)
        }
    },

    checkIsEmailExist: async (req, res, next) => {
        try {
            let b = await connection.query(`SELECT * from user
                                      WHERE user.email = "${req.body.email}"`)

            if (b[0][0]) {
                throw new Error('User with this email is already exist')
            }
            next()
        } catch (e) {
            next(e)
        }
    },
    IsAdminUser: async (req, res, next)=>{
        try {
            let role = req.body.role
            if(role !== 'admin'){
                throw new Error('This only for admin')
            }
            next()
        }
        catch (e){
            next(e)
        }
    }
}