// Permet de vérifier si l'utilisateur est bien authentifié
const verif_authentification = function (session, res) {
    if (session.user === undefined) {
        session.destroy((err) => { })
        res.redirect('/login')
        return false
    }

    else {
        return true
    }
}

module.exports = verif_authentification