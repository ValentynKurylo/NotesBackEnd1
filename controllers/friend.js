const connection = require('../models/mysql')

module.exports = {
    getMyFriends: async (req, res)=>{
        let id = req.params.userId
        let data = await connection.query(`SELECT * FROM friend WHERE friend.userId = "${id}"`)
        res.json(data[0])
    },
    postFriend: async (req, res)=>{
        let body = req.body
        let friend = await connection.query(`INSERT into friend(userId, friendId) values ("${body.userId}", "${body.friendId}")`)
        res.json('Good')
    },
    deleteFriend: async (req, res)=>{
        let id = req.params.id
        let friend = await connection.query(`DELETE FROM friend WHERE friend.id = "${id}"`)
        res.json('deleted')
    }
}