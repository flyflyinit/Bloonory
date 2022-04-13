// Permet l'utilisation du fichier de configuration .env
require('dotenv').config()

// Permet d'utiliser les lib
const express = require("express")
const bcrypt = require("bcryptjs")
const session = require('express-session')

// Permet d'utiliser les fonctions des scripts JS
const verif_authentification = require("./script/js/verif_authentification")

// Créer une instance d'express
let app = express()

// Permet de setup EJS
app.set('view engine', 'ejs')

// Permet l'utilisation des fichiers dans public et dans script
app.use('/public', express.static('public'))
app.use('/script', express.static('script'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Permet de gérer la connexion à la base de donnée
const pgSession = require('connect-pg-simple')(session)
let pgPool = require('./config/database_pool')

const User = require("./models/user");
const Comments = require('./models/comments');
const Hospital = require("./models/hospital");
const Appointment = require("./models/appointment");
const AppointmentRHospital = require("./models/appointment_relation_hospital");
const moment = require("moment");

// Permet de setup une session express
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

app.use(require('./script/js/flash'))

// Les routes
// Route vers la page Homepage
app.get('/', (req, res) => {
    res.redirect('/home')
})

// Route vers la page Homepage
app.get('/home', (req, res) => {
    res.render('pages/index', {connected : verif_authentification(req.session)})
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

// Route vers la page Comments
app.get('/comments', async (req, res) => {
    const data = await Comments.find_all_and_info_user()
    const connexion = req.session.user !== undefined

    res.render('pages/comments', {comments: data, connexion: connexion})
})

// Permet d'inscrire le commentaire de l'utilisateur connecté dans la base de donnée
app.post('/comments', async (req, res) => {
    const { comment } = req.body
    await Comments.create(comment, req.session.user.mail_user)

    res.redirect('/comments')
})

// Route vers la page Partners
app.get('/partners', async (req, res) => {
    const hospitals = await Hospital.find_all()

    const array_address = []

    for (const hospital in hospitals) {
        array_address.push({name: hospitals[hospital].name, address: hospitals[hospital].address, city : hospitals[hospital].city})
    }

    res.render('pages/partners', {hospitals: array_address, connected : verif_authentification(req.session)})
})

// Route vers la page FAQs
app.get('/faq', (req, res) => {
    res.render('pages/faq', {connected : verif_authentification(req.session)})
})

// Route vers la page About us
app.get('/about_us', (req, res) => {
    res.render('pages/about_us', {connected : verif_authentification(req.session)})
})

// Route vers la page Login
app.get('/login', (req, res) => {
    res.render('pages/login')
})

// Vérifie si l'utilisateur est dans la base de donnée et si le mot de base est correct si c'est le cas créer une session
app.post('/login', async (req, res) => {
    const {email, password} = req.body

    const data = await User.find(email)

    if (data.row && (bcrypt.compareSync(password, data.password_user))) {
        req.session.user = {
            last_name: data.last_name,
            first_name: data.first_name,
            mail_user: data.mail_consumer,
        }

        res.redirect('/home')
    }

    else {
        req.session.destroy((err) => { })
        res.redirect('/login')
    }
})

// Route vers la page d'Administration
app.get('/admin', (req, res) => {
    res.render('pages/login')
})

// Vérifie si l'admin est dans la base de donnée et si le mot de base est correct si c'est le cas créer une session
app.post('/admin', (req, res) => {
    // Pas encore implémenté
    console.log(req.body.email)
    console.log(req.body.password)
})

// Route vers la page Create an account
app.get('/create_account', (req, res) => {
    res.render('pages/create_account')
})

// Permet la création d'un compte utilisateur dans la base de donnée
app.post('/create_account', async (req, res) => {
    const { firstName, lastName, email, password, conf_password, address, city, phone_number, gender, blood_group } = req.body

    if (password !== conf_password) {
        console.log("ERREUR ajouter des warnings")
    }
    
    // Ajouter toutes les conditions nécessaire avant de créer un utilisateur.
    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = User.create(email, lastName, firstName, blood_group, gender, address, city, phone_number, encryptedPassword)
    if (user) {
        req.session.user = {
            last_name: lastName,
            first_name: firstName,
            mail_user: email,
        }

        res.redirect('/home')
    }
})

// Route vers la page My Account
app.get('/my_account', async (req, res) => {
    if (verif_authentification(req.session)) {
        const user = await User.find(req.session.user.mail_user)
        const appointments = await AppointmentRHospital.find(req.session.user.mail_user, "incoming")

        res.render('pages/my_account', {user: user, appointments: appointments, connected: true})
    } else {
        res.redirect('/login')
    }
})

// Permet de ce deconnecter ou de modifier les infos de l'utilisateur
app.post('/my_account', async (req, res) => {
    if (verif_authentification(req.session)) {
        if (req.body.hasOwnProperty("log_out")) {
            req.session.destroy((err) => {
            })
            res.redirect('/home')
        } else if (req.body.hasOwnProperty("apply")) {
            const { address, city, phone_number } = req.body
            await User.update_info(req.session.user.mail_user, address, city, phone_number)
            res.redirect('/home')
        } else {
            const data = req.body['delete'].split(',')
            const information = `Delete by client at ${moment()}`
            const date = moment(new Date(data[2])).format("YYYY-MM-DD")

            await Appointment.update_type('cancel', information, data[0], data[1], date)
            res.redirect('/my_account')
        }

    } else {
        res.redirect('/login')
    }
})

// Route vers la page Donator
app.get('/donator', async (req, res) => {
    if (verif_authentification(req.session)) {
        const hospitals = await Hospital.find_all()
        const user = await User.find(req.session.user.mail_user)
        const address = `${user.address}, ${user.city}`
        const today = new Date().toISOString().split("T")[0]

        res.render('pages/appointment', {title: "Donator", address: address, hospitals: hospitals, connected: true, date: today})
    } else {
        res.redirect('/login')
    }
})

// Permet de créer un rendez-vous en tant que donateur dans la base de donnée
app.post('/donator', async (req, res) => {
    if (verif_authentification(req.session)) {
        const { date, start, end } = req.body
        if (end !== "") {
            const address = end.split(',')

            const hospitals = await Hospital.find_by_address(address[0], address[1])

            await Appointment.create(req.session.user.mail_user, hospitals.hospital_id, date, "donnation", "incoming", "no information")

            res.redirect('/home')
        } else {
            req.flash('error', "Please select an hospital")
            res.redirect('/donator')
        }
    } else {
        res.redirect('/login')
    }
})

// Route vers la page Beneficiary
app.get('/beneficiary', async (req, res) => {
    if (verif_authentification(req.session)) {
        const hospitals = await Hospital.find_all()

        const user = await User.find(req.session.user.mail_user)

        const today = new Date().toISOString().split("T")[0]

        res.render('pages/appointment', {title: "Beneficiary", address: user.address, hospitals: hospitals, connected: true, date: today})
    } else {
        res.redirect('/login')
    }
})

// Permet de créer un rendez-vous en tant que bénéficiaire dans la base de donnée
app.post('/beneficiary', async (req, res) => {
    if (verif_authentification(req.session)) {
        const {date, start, end} = req.body
        if (end !== '') {
            const address = end.split(',')

            const hospitals = await Hospital.find_by_address(address[0], address[1])

            await Appointment.create(req.session.user.mail_user, hospitals.hospital_id, date, "beneficiary", "incoming", "no information")

            res.redirect('/home')
        } else {
            req.flash('error', "Please select an hospital")
            res.redirect('/beneficiary')
        }
    } else {
        res.redirect('/login')
    }
})

// Permet de rediger toutes les autres url vers la page Home
app.get('/*', (req, res) => {
    res.redirect('/home')
})

app.listen(8080)