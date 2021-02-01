const express =require('express')
const router = express.Router()
const {ensureAuthenticated } = require('../config/auth')

//Welcome Pages
router.get('/', (req, res)=>{
    res.render('welcome')
})

//dashboard pages
router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    res.render('dashboard', {
        name : req.user.name
    })
})
module.exports = router