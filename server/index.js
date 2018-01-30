
require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')


var app = express();

app.use(cors())
app.use(bodyParser.json())

massive(process.env.DB_CONNECTION).then(db=> {app.set('db', db)})

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

    console.log(profile)
    
    const db = app.get('db')
    let userData = profile
    let auth_id = userData.id.split('|')[1]

    console.log(auth_id)


    let auth_id_int = parseInt(auth_id)
    

    db.find_user([auth_id]).then( user => {
        if (user[0]){
            done(null, user[0].id)
        }else {
            db.create_user([auth_id, profile.name.familyName, profile.name.givenName]).then(user =>{
                return done(null, user[0].id)
            })
        }
    })

    


}))



app.get('/auth', passport.authenticate('auth0')) //this is the initial request comes this fires process for new auth0 on line 27
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: process.env.AUTH_SUCCESS_REDIRECT,
    failureRedirect:process.env.AUTH_LANDING_REDIRECT
}))



passport.serializeUser(function(user,done){
    // req.user === id
    
    done(null, user)
})
//These are where ^^ we say req.user is defined
passport.deserializeUser(function(user,done){
    const db = app.get('db')
    db.find_user_by_session([user]).then (user =>{
        done(null, user[0])
    })
    //make query call to find the user that match req.user
})
//desrializeUser gets ran anytime the user hits an endpoint that has a session 

app.get('/auth/me', function (req, res, next){
    if(!req.user){
        res.status(401).send('LOG IN REQUIRED')

    } else {
        res.status(200).send(req.user)
    }
})

app.get('/auth/logout',  function(req,res,next){
    req.logout()
    res.redirect(process.env.AUTH_LANDING_REDIRECT)
}
)









app.listen(3005, ()=>{console.log('app is listening on 3005')})