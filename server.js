const express = require('express');
const bodyParser = require('body-parser');
//with bcrypt we can safely store users info and passwords into a data base so that hackers can't access passwords
const bcrypt = require('bcrypt-nodejs');
//to deblock CORS policy:
const cors = require('cors')
//we use knex to connect our server with our database
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'bihter92',
      database : 'face'
  }
});

db.select('*').from('users').then('users').then(data => console.log('its is working :)'))

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {res.send(dataBase.users)})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(3000, () => {
    console.log('app is running on port 3000')
})