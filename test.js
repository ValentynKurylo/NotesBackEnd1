require('dotenv').config()
const express = require('express')
//const mongoose = require('mongoose')
const connection = require('./models/mysql')
//const connection = require('./MySql')
//connection.getInstance().setModel()
const userRouter = require('./routers/users')
const authRouter = require('./routers/auth')
const notationRouter = require('./routers/notation')
const friendRouter = require('./routers/friend')
const fileUpload = require('express-fileupload')
const path = require('path')
const app =express()

//_mongooseConector()

app.use(express.json())
//app.use(express.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname, 'static')))
//app.use(fileUpload({}))

app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH')
    next()
})
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
})*/
app.get('/', (req, res)=>{
    res.write("Hello ")
    res.write("World!!!")
    res.end()
})
//const data = connection.getInstance().getModel('User')
//console.log(data)
app.get('/m', async (req, res)=>{
   // const data = connection.getInstance().getModel('user')

    let d = await connection.query(`SELECT * FROM user`)
    console.log(d[0])
    res.json(d[0])
    /*
    const user = await data.findAll()
    res.json(user)
    console.log(user)*/
})

app.post('/m', async (req, res)=>{
    const data = connection.getInstance().getModel('user')
    const jane = await data.create({  name: 'Valentyn', email: 'Val@gmail.com', password: '11112222', role: 'admin'});
    res.json(jane)
})

app.post('/', (req, res)=>{
    res.json("POST")
    console.log(req.body)
})


app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/notation', notationRouter)
app.use('/friend', friendRouter)

app.listen(3000, ()=>{

    console.log("App listen 3000")
})

