// Permet de vérifier si l'utilisateur est bien authentifié
const verif_authentification = function (session) {
    if (session.user === undefined) {
        session.destroy((err) => { })
        return false
    }

    else {
        return true
    }
}

module.exports = verif_authentification