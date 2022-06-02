const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const res = require('express/lib/response');
const signin= require('./controllers/handleSignin.js');
const register = require('./controllers/handleRegister.js');
const profile = require('./controllers/handleId.js');
const image = require('./controllers/handleImage.js')


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'qwerty',
      database : 'smart-brain-api'
    }
  });

  db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors())



app.post('https://smart-detector-server.herokuapp.com/signin',(req, res) => {
    signin.handleSignIn(req, res, db, bcrypt)
})

app.post('https://smart-detector-server.herokuapp.com/register',(req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})


app.get('/profile/:id',(req, res) => {
    profile.handleId(req, res, db, bcrypt)
})


app.put('https://smart-detector-server.herokuapp.com/image', (req, res) => {
    image.handleImage(req, res, db, bcrypt)
})

/*app.get('/', (req, res) => {
    res.send('Success is yours');})*/

   /* bcrypt.hash("bacon", null, null, function(err, hash) {
        // Store hash in your password DB.
    });
    
    // Load hash from your password DB.
    bcrypt.compare("bacon", hash, function(err, res) {
        // res == true
    });
    bcrypt.compare("veggies", hash, function(err, res) {
        // res = false
    });*/

app.listen(process.env.PORT || 3001, () => {
    console.log("app is running on port 3001");
})




/*
/--> res = this is working
/signin --POST responds with success / fail
/register --POST = user
/profile/:userId --GET = user
/image -- PUT -- user
*/