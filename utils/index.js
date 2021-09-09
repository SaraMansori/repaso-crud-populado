module.exports = {

    isLogged: (req) => req.session.currentUser,
    isADMIN: (req) => req.session.currentUser?.role === 'ADMIN'

}