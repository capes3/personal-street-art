// importing and requiring all the necessary dependencies
require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , path = require('path')

// putting an instance of express on the variable app
var app = express();

app.use( express.static( `${__dirname}/../build` ) );

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.use(cors())
app.use(bodyParser.json())

// using massive to connect to the postgres database through our dotenv file
massive(process.env.DB_CONNECTION).then(db=> {app.set('db', db)})

// using express session to set up session 
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}))

// app.use(express.static(__dirname+'/../build'))


app.use(passport.initialize()) // initializing passport so that you can use it. Setting up an instance of passport that you're goinng to use throughout your app
app.use(passport.session()) //passport.session puts it back on req.user

passport.use(new Auth0Strategy({
    //Telling passport where you're going to use auth0 it, it finds the auth0 app then tells it, then when you hit it this is what you're going to do
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL:process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done){

    // console.log(profile)
    
    const db = app.get('db')
    let userData = profile
    let auth_id = userData.id.split('|')[1]

    // console.log(auth_id)
    
    // let auth_id_int = parseInt(auth_id)
    let user_number = 10

    //this connects to the database to find a user, and if there is one it returns that user, if not it creates a user.  I need to fix this.  

    db.find_user([auth_id]).then( user => {
        if (user[0]){
            done(null, user[0].id)
        }else {
            db.create_user([auth_id]).then(user =>{
                return done(null, user[0].id)
            })
        }
    })

    


}))

//I think this just connects to passport, and auth0, then uses the paths that we give it in our dotenv file.  

app.get('/auth', passport.authenticate('auth0')) 
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.AUTH_SUCCESS_REDIRECT,
    failureRedirect:process.env.AUTH_LANDING_REDIRECT
}))


passport.serializeUser(function(user,done){
    // req.user === auth_id
    
    done(null, user)
})
//These are where ^^ we say req.user is defined
passport.deserializeUser(function(user,done){
    const db = app.get('db')
    db.find_user_by_session([user]).then (user =>{
        done(null, user[0])
    })
    
})
//deserializeUser gets ran anytime the user hits an endpoint that has a session 

//these are express getting the authorization endpoints in order to get the auth0 page up.  

app.get('/auth/me', function (req, res, next){
    if(!req.user){
        res.status(401).send('LOG IN REQUIRED')

    } else {
        res.status(200).send(req.user)
        // console.log(req.user)
    }
})

//this is the logout endpoint, but I don't use it in my app yet.  

app.get('/auth/logout',  function(req,res,next){
    req.logout()
    res.redirect(process.env.AUTH_LANDING_REDIRECT)
}
)

//this is an express endpoint that gets an image from the random page, and saves it to the database, it uses req.user to find the user number, and then uses req.body to get the saved image.  
app.post('/api/saved', function(req,res,next){
    // console.log(req.body)
    // console.log(req.user.user_number)
    var id_int = parseInt(req.user) 
    req.app.get('db')
        .save_img([req.user.user_number, req.body.savedImg]).then(users => {
            res.status(200).send()
        });
})

app.get('/auth/user', function(req,res){
  
    res.status(200).send(req.user)


})

//this gets the images in the saved based on ones that have the same user number that's on req.user, it sends that number to the get_saved_img sql file
app.get('/api/saved', function(req,res,next){
    req.app.get('db')
    .get_saved_img([req.user.user_number]).then(img=>{
        res.status(200).send(img)
    })
    .catch(err =>{console.log(err)})
})

//this deletes the image in the saved view based on its number.  It gets this number from req.query that comes from the front end.  

app.delete('/api/saved/:id', function(req,res,next){
    req.app.get('db')
    .delete_saved_img(req.query[0]).then(id => {
        res.status(200).send()
    })
    .catch(err =>{console.log(err)})
})

//this connects to the featured table in the database, and gets the url for the featured photo.  

app.get('/api/featured', function(req,res,next){
    req.app.get('db')
    .get_featured([req.body]).then(featured =>{
        res.status(200).send(featured)
    })
})

//This also connects to the featured table, and it grabs the description.

app.put('/api/featured', function(req,res,next){
    console.log(req.body.newDescription)
    req.app.get('db')
    .update_featured_description([req.body.newDescription]).then(description =>{
        res.status(200).send(description)
    })
})

app.put('/api/featuredimg', function(req,res,next){
    console.log(req.body.newImage)
    req.app.get('db')
    .update_featured_image([req.body.newImage]).then(image =>{
        res.status(200).send(image)
    })
})


//this just sets up our server on port 3005.  

app.listen(3005, ()=>{console.log('app is listening on 3005')})