const mongoose = require("mongoose")
const transporter = require('./../config/mailing.config')

module.exports = {
    isLoggedIn: (req, res, next) => {
        req.session.currentUser ? next() : res.render('pages/auth/log-in-form', { errorMsg: 'Inicia sesión para continuar' })
    },

    checkId: (req, res, next) => {
        mongoose.Types.ObjectId.isValid(req.params.id) ? next() : res.redirect('/')
    },

    checkRoles: (...roles) => (req, res, next) => {
        if (roles.includes(req.session.currentUser.role)) {
            next()
        } else {

                let text = "User tried to access without permission"

                transporter
                .sendMail({
                  from: `Amazing Coasters <myawesome@gmail.com>`,
                  to: "ironhacker3000@gmail.com",
                  subject: "User tried to access without permission",
                  text,
                  html: `<b>${text}</b>`
                })
                .then(info => console.log(info.response))
                .catch(error => console.log(error))

                res.render('pages/auth/log-in-form', { errorMsg: 'No tienes permisos' })
            } 

    }

}