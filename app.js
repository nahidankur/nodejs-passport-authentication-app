const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const db = require('./config/keys').MongoURI
const passport = require('passport')

const app = express()

require('./config/passport')(passport)

mongoose.connect(db, { useNewUrlParser : true})
.then(()=> console.log('Mongodb Connected...'))
.catch(err => console.log(err))

app.use(expressLayouts)
app.set('view engine', 'ejs')


app.use(express.urlencoded( {extended: false})) //bodyparser

// express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//connect flash
app.use(flash())

//global varriables
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

const PORT = process.env.PORT || 3000

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(PORT, ()=>{
    console.log(`Server is running under port ${PORT}`)
})