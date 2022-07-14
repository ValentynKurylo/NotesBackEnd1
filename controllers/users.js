
const connection = require('../models/mysql')
const users = require('../models/User')
const helper = require('../helpers/password')

//console.log(users);
/*
const db = require('../MySql').getInstance()
console.log(db)
let users = [
    {
        'name': 'Valentyn',
        'age': '20'
    }
]
module.exports = {
    getAllUsers: async (req, res)=>{
        res.json(users)
        //console.log(users1)
    },
    getUserById: (req, res)=>{
        let id = req.params.id
        res.json(users[id])
    },
    getUserByName: (req, res)=>{
        let name = req.params.name
        let u = []
        for(let i = 0; i < users.length; i++){
            if(users[i].name === name){
                u.push(users[i])
            }
        }
        console.log(u)
        res.json(u)
    },
    postUser: (req, res)=>{
        let user = req.body
        users.push(user)
        res.json(user)
    },
    deleteUser: (req, res)=>{
        let id = req.params.id
        let user = users[id]
        let u = []
        for(let i = 0; i < users.length; i++){
            if(i != id){
                u.push(users[i])
            }
        }
        res.json(u)
        users = u
    },
    getUsers: async (req, res)=>{
        console.log("qwer")
        const u = db.getModel('user')
        const u1 = await u.findAll()
        res.json(u1)
        console.log('u1', u1)
    },
    postU: async (req, res)=>{
        const u = db.getModel('user')
        const p = await u.create({
            name: req.body.name
        })
    }
}*/

module.exports = {
    getAllUsers: async (req, res)=>{
        let u = await connection.query(`SELECT * FROM user`)
        res.json(u[0])
        //console.log(users1)
    },

    getUserById: async (req, res)=>{
        let id = req.params.id
        let u = await connection.query(`SELECT id, name, email, role FROM user WHERE user.id = "${id}"`)
        res.json(u[0])
    },
    getUserByName: async (req, res)=>{
        let name = req.params.name
        console.log(name, typeof(name))
        let u = await connection.query(`SELECT id, name, email FROM user WHERE user.name = "${name}"`)
        res.json(u[0])
    },
    postUser: async (req, res)=>{
        let body = req.body
        let hashPassword = await helper.hash(body.password)
        body.password = hashPassword
        let u = await connection.query("INSERT into user SET?", body, (err, result, fields)=>{
            if(err){
                throw err
            }
            res.send(result)
        })
        res.json(body)
    },
    putUser: async (req, res)=>{
        let id = req.params.id
        let body = req.body
        let hashPassword = await helper.hash(body.password)
        body.password = hashPassword
        console.log(id, body)
        let u = await connection.query(`UPDATE user SET name = "${body.name}", email="${body.email}", password="${body.password}" WHERE user.id = "${id}"`)
        res.json("good")
    },
    deleteUser: async (req, res)=>{
        let id = req.params.id
        let u = await connection.query(`DELETE FROM user WHERE user.id = ${id}`)
        res.json(u)
    },
    postPhoto: async (req, res)=>{
        let photo = req.files
        res.json(photo)
    }
}