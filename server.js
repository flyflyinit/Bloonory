require('dotenv').config()

const express = require("express")
const bcrypt = require("bcryptjs")
const session = require('express-session')

let app = express()

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))
app.use('/script', express.static('script'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const pgSession = require('connect-pg-simple')(session)

let pgPool = require('./config/database_pool')
const User = require("./models/user");

app.use(session({
    store: new pgSession({
        pool : pgPool,
        tableName : 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// Les routes
// Homepage
app.get('/', (req, res) => {
    res.redirect('/home')
})

app.get('/home', (req, res) => {
    res.render('pages/index')
})

// Method post pour la redirection des boutons donator et beneficiary
app.post('/home',  (req, res) => {
    if (req.session.user === undefined) {
        res.redirect('login')
    }

    else {
        if (req.body.hasOwnProperty("donator")) {
            res.redirect('/donator')
        }
        if (req.body.hasOwnProperty("beneficiary")) {
            res.redirect('/beneficiary')
        }
    }
})

// Comments
app.get('/comments', async (req, res) => {
    const Comments = require('./models/comments')
    const data = await Comments.find_all_and_info_user()

    let connexion = false

    if (req.session.user !== undefined) {
        connexion = true
    }

    res.render('pages/comments', {comments: data, connexion: connexion})
})

app.post('/comments', async (req, res) => {
    const { comment } = req.body
    const Comments = require('./models/comments')

    const data = await Comments.create(comment, req.session.user.mail_user)

    res.redirect('/comments')
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

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    const User = require('./models/user')

    const data = await User.find(email)
    if (data && (bcrypt.compareSync(password, data.password_user))) {
        req.session.user = {
            nom: data.nom,
            prenom: data.prenom,
            mail_user: data.mail_user,
        }

        res.redirect('/home')
    }

    else {
        req.session.destroy((err) => { })
        res.redirect('/login')
    }
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

app.post('/create_account', async (req, res) => {
    let User = require('./models/user')

    const { firstName, lastName, email, password, conf_password, address, city, phone_number, gender, blood_group } = req.body

    if (password !== conf_password) {
        console.log("ERREUR ajouter des warnings")
    }
    
    // Ajouter toutes les conditions nécessaire avant de créer un utilisateur.
    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = User.create(email, lastName, firstName, blood_group, gender, address, city, phone_number, encryptedPassword)
    if (user) {
        req.session.user = {
            nom: lastName,
            prenom: firstName,
            mail_user: email,
        }

        res.redirect('/home')
    }
})

// Create a donator page
app.get('/donator', (req, res) => {
    res.render('pages/donator')
})

// Create a beneficiary page
app.get('/beneficiary', (req, res) => {
    res.render('pages/beneficiary')
})

// Other page
app.get('/*', (req, res) => {
    res.redirect('/home')
})

app.listen(8080)