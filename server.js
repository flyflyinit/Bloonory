const express = require("express");
let app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use('/script', express.static('script'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Les routes
// Homepage
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.render('pages/index')
})

// Comments
app.get('/comments', (req, res) => {
    res.render('pages/comments')
})

// Partners page
app.get('/partners', (req, res) => {
    res.render('pages/partners')
})

// FAQs page
app.get('/faq', (req, res) => {
    res.render('pages/faq')
})

// About us page
app.get('/about_us', (req, res) => {
    res.render('pages/about_us')
})

// Connexion page
app.get('/login', (req, res) => {
    res.render('pages/login')
})

app.post('/login', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
})

// Administration page
app.get('/admin', (req, res) => {
    res.render('pages/login')
})

app.post('/admin', (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
})

// Create an account page
app.get('/create_account', (req, res) => {
    res.render('pages/create_account')
})

app.post('/create_account', (req, res) => {
    console.log(req.body.firstName)
    console.log(req.body.lastName)
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(req.body.conf_password)
    console.log(req.body.address)
    console.log(req.body.city)
    console.log(req.body.phone_number)
    console.log(req.body.gender)
    console.log(req.body.blood_group)
})

// Other page
app.get('/*', (req, res) => {
    res.redirect('/home')
})

app.listen(8080)