// Permet de vérifier si l'utilisateur est bien authentifié
const verif_authentification_admin= function (session) {
    if (session.admin === undefined) {
        session.destroy((err) => { })
        return false
    }

    else {
        return true
    }
}

module.exports = verif_authentification_admin