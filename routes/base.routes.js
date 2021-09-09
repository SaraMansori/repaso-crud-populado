const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

router.get('/', (req, res) => res.render('pages/index'))

router.get("/signup", (req,res) => res.render("pages/auth/sign-up-form"))

router.post("/signup", (req, res) => {

    const { username, pwd } = req.body

    if (pwd.length === 0 || username.length === 0) {
        res.render("pages/auth/sign-up-form", { errorMsg: 'Rellena los campos' })
        return
      }

    User
        .findOne({ username })
        .then( (user) => {
          if (user) {
            res.render("pages/auth/sign-up-form", { errorMsg: 'Usuario ya registrado' })
            return
          }
          
          const bcryptSalt = 10
          const salt = bcrypt.genSaltSync(bcryptSalt)
          const hashPass = bcrypt.hashSync(pwd, salt)

          User
            .create({ username, password: hashPass })
            .then(() => res.redirect("/"))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.get("/login", (req,res) => res.render("pages/auth/log-in-form"))

router.post("/login", (req,res) => {
    const { username, pwd } = req.body

    if (pwd.length === 0 || username.length === 0) { 
      res.render('pages/auth/log-in-form', { errorMsg: 'Rellena los campos' })
      return
    }
  
    User
      .findOne({ username })
      .then(user => {
  
        if (!user) {
          res.render('pages/auth/log-in-form', { errorMsg: 'Usuario no reconocido' })
          return
        }
  
        if (bcrypt.compareSync(pwd, user.password) === false) {
          res.render('pages/auth/log-in-form', { errorMsg: 'Contraseña incorrecta' })
          return
        }
  
        req.session.currentUser = user
        res.redirect('/')
      })
      .catch(err => console.log(err))

})

router.post("/mail", (req, res, next) => {

  transporter
    .sendMail({
      from: `Amazing Coasters <myawesome@gmail.com>`,
      to,
      subject: "User tried to access without permission",
      text: "A user tried to acces a page without the proper permission",
      html: `<b>${text}</b>`
    })
    .then(info => res.send(info))
    .catch(error => console.log(error))

})

module.exports = router