const express = require('express')
const dboperation = require('./container/dboperation')
const cors = require('cors')
const user = require('./container/user')

const api_port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/create', async function (req, res){
    await dboperation.createUser(req.body)
    const users = await dboperation.getUsers()
    res.send(users)
 })

 app.get('/get', async function (req, res) {
   console.log('called getusers')
   const users = await dboperation.getUsers()
   res.send(users)
})

 app.get('/champions', async function (req, res) {
   console.log('called getChampions')
   const users = await dboperation.getChampions()
   res.send(users)
})

 app.post('/update', async function (req, res){
    console.log(req.body)
    await dboperation.updateUser(req.body)
    const users = await dboperation.getUsers()
    res.send(users)
 })

 app.post('/delete', async function (req, res){
    await dboperation.deleteUser(req.body.id)
    const users = await dboperation.getUsers()
    res.send(users)
 })

app.listen(api_port, () => console.log(`listening on port ${api_port}`))
