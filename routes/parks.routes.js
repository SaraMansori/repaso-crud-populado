const express = require('express')
const router = express.Router()
const Park = require("../models/Park.model")
const { checkId, checkRoles, isLoggedIn } = require("../middleware")
const { isADMIN } = require("../utils")

router.get("/", (req, res) => res.send("lista de parques"))

router.get("/new", isLoggedIn, checkRoles('ADMIN'), (req, res) => res.render("pages/parks/new-park"))

router.post("/new", isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { name, description } = req.body

    if (name.length === 0 || description.length === 0) {
        res.render("pages/parks/new-park", { errorMsg: 'Asegúrate de que ningun campo está vacío'})
        return
    }
    
    Park
    .create( {name, description} )
        .then( (park) => {

        })
        .catch((err) => console.log(err))

})

module.exports = router
