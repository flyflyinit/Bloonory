const express = require("express");
let app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
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

// Other page
app.get('/*', (req, res) => {
    res.redirect('/home')
})

app.listen(8080)