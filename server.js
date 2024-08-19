const express = require('express')
const dboperation = require('./container/dboperation')
const cors = require('cors')
const user = require('./container/user')

const api_port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.post('/api', async function (req, res){
    await dboperation.createUser(req.body)
    const users = await dboperation.getUsers()
    res.send(users)
 })

 app.get('/hello', function (req, res) {
     console.log('called')
    // res.send({result: 'omg hi'})
})

const Yikes = new user('Yikes', 'Silver', 3)




// dboperation.createUser(Yikes)

app.listen(api_port, () => console.log(`listening on port ${api_port}`))
