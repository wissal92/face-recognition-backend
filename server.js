const express = require('express');
const bodyParser = require('body-parser');
//with bcrypt we can safely store users info and passwords into a data base so that hackers can't access passwords
const bcrypt = require('bcrypt-nodejs');
//to deblock CORS policy:
var cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors())

const dataBase = {
    users: [
        {
            id: '123',
            name: 'wissal',
            email: 'wissal@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'himimi',
            email: 'himimi@gmail.com',
            password: 'cookies2',
            entries: 0,
            joined: new Date()
        },
    ]
}
app.get('/', (req, res) => {
    res.send(dataBase.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === dataBase.users[0].email && req.body.password === dataBase.users[0].password){
        res.json(dataBase.users[0]);
    } else {
        res.status(400).json(`you can't login :(`)
    }
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;

    dataBase.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(dataBase.users[dataBase.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    dataBase.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return res.json(user);
        } 
    })

    if(!found){
        res.status(400).json('not found')
    }
})

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    dataBase.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        } 
    })

    if(!found){
        res.status(400).json('not found')
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running on port 3000')
})