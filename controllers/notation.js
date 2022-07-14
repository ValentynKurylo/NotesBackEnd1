const connection = require('../models/mysql')

module.exports = {
    getAllNotation: async (req, res)=>{
        let note = await connection.query('SELECT * FROM notacion')
        res.json(note[0])
    },
    getNotationByUserId: async (req, res)=>{
        let id = req.params.userId
        let data = await connection.query(`SELECT * FROM notacion WHERE notacion.userId = "${id}"`)
        res.json(data[0])
    },
    postNotation: async (req, res) => {
        let body = req.body
        let data = await connection.query(`INSERT INTO notacion(name, text, startDate, endData, public, status, userId)
                                           values ("${body.name}", "${body.text}", "${body.startDate}", "${body.endData}", "${body.public}", "${body.status}", "${body.userId}")`)
    },
    getById: async (req, res)=>{
        let id = req.params.id
        let data = await connection.query(`SELECT * FROM notacion WHERE notacion.id = "${id}"`)
        res.json(data[0][0])
    },
    putNotation: async (req, res)=>{
        let body = req.body
        let id = req.params.id
        let data = await connection.query(`UPDATE notacion SET name = "${body.name}", text = "${body.text}", startDate = "${body.startDate}", endData = "${body.endData}", public = "${body.public}", status = "${body.status}", userId = "${body.userId}" WHERE notacion.id = "${id}"`);
        res.json("good")
    },
    DeleteNotation: async (req, res)=>{
        let id = req.params.id
        let data = await connection.query(`DELETE FROM notacion WHERE notacion.id = "${id}"`)
        res.json('deleted')
    }
    
}