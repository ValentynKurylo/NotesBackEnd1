const hasher = require('../helpers/password')
const connection = require('../models/mysql')
const authHelper = require('../helpers/authToken')

module.exports = {
    login: async (req, res, next) => {
        try {
            let body = req.body
            let user = await connection.query(`SELECT *
                                               FROM user
                                               WHERE user.email = "${body.email}"`)

            if(!user[0][0]){
                throw new Error("Wrong email or password")
                //res.json('Wrong email or password')
            }

            await hasher.compare(user[0][0].password, body.password)
            let tokenPair = authHelper.generateTokenPair()
            res.json(tokenPair)
            await connection.query(`INSERT into auth (accessToken, refreshToken, userId) values ("${tokenPair.accessToken}", "${tokenPair.refreshToken}", "${user[0][0].id}")`)


        }
        catch (e){
            next(e)
        }

    },
    logout: async (req, res, next)=>{
        try{
            const token = req.get('Authorization');
            await connection.query(`DELETE FROM auth WHERE auth.accessToken = "${token}"`)
            //await OAuth.remove({accessToken: token})
            res.json("You logout")
        }catch (e){
            next(e)
        }
    },
    getCurrentUser: async (req, res, next)=>{
        try{
            let body = req.body
            let user = await connection.query(`SELECT *
                                               FROM user
                                               WHERE user.email = "${body.email}"`)

            if(!user[0][0]){
                throw new Error("Wrong email or password")
                //res.json('Wrong email or password')
            }
            res.json(user[0])
        }
        catch (e){
            next(e)
        }
    }

}