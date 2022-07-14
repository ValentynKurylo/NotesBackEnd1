const authHelper = require('../helpers/authToken')
const connection = require('../models/mysql')

module.exports = {
    checkAccessToken: async (req, res, next)=>{
        try{
            const token = req.get('Authorization')
            if(!token){
                throw new Error(401, 'No token')
            }
            await authHelper.verifyToken(token)
            const tokenObject = await connection.query(`SELECT accessToken FROM auth WHERE auth.accessToken = "${token}"`)
            if(!tokenObject){
                throw new Error(401, 'Wrong token 2')
            }
            req.user = tokenObject.user
            next()
        }
        catch (e){
            next(e)
        }
    }
}