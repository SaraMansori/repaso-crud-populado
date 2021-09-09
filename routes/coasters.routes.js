const CDNupload = require("../config/upload.config")
const express = require('express')
const router = express.Router()
const Park = require("../models/Park.model")
const Coaster = require("../models/Coaster.model")
const { checkId, checkRoles, isLoggedIn } = require("../middleware")
const {isADMIN } = require("../utils")

router.get("/new", isLoggedIn, checkRoles('ADMIN'), (req, res) => {


    Park
        .find()
        .select("name")
        .then((parks)=>{
            res.render("pages/coasters/new-coaster", {parks})
        })
        .catch(err => console.log(err))

    
})

router.post("/new", isLoggedIn, checkRoles('ADMIN'), CDNupload.single('coaster_image'), (req, res) => {

    const { name, description, length, inversions, park_id } = req.body

    Park
        .find()
        .select("name")
        .then((parks)=>{
            if (name.length === 0 || description.length === 0 || length.length === 0 || inversions.length === 0) {
                res.render("pages/coasters/new-coaster", { parks, errorMsg: 'Asegúrate de que ningun campo está vacío'})
                return
            }
        })
        .catch(err => console.log(err))
    
        console.log('Objeto file de Multer:', req.file)

    Coaster
        .create( { 
            name, 
            description, 
            length, 
            inversions, 
            park_id, 
            coaster_image: req.file.path,
        })
        .then( () => {
            res.redirect("/coasters")
        })
        .catch(err => console.log(err))
})

router.get("/", (req, res) => {

    Coaster
        .find()
        .populate("park_id")
        .then((coasters)=>{
            res.render("pages/coasters/coasters-index", { coasters })
        })
        .catch(err => console.log(err))
})

router.get("/delete", isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query

    Coaster
        .findByIdAndDelete(id)
        .then((coaster)=>{
            res.render("pages/coasters/")
        })
        .catch(err => console.log(err))
})

router.get("/edit", isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query
    const info = {}

    Park
        .find()
        .then((parks)=>{
            info.parks = parks
            return Coaster.findById(id).populate("park_id")
        })
        .then((coaster)=>{
            info.coaster = coaster

            info.parks.forEach((park) => {
                park.id === info.coaster.park_id.id ? park.isCurrPark = true : park.isCurrPark = false
            })

            res.render("pages/coasters/edit-coaster", { info })
        })
        .catch(err => console.log(err))
})

router.post("/edit", isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id } = req.query
    const { name, description, length, inversions, park_id } = req.body
    const info = {}
        
        Park
            .find()
            .then((parks)=>{
                info.parks = parks
                return Coaster.findById(id).populate("park_id")
            })
            .then((coaster)=>{
                info.coaster = coaster
                if (name.length === 0 || description.length === 0 || length.length === 0 || inversions.length === 0) {
                    res.render("pages/coasters/edit-coaster", {info, errorMsg: 'Asegúrate de que ningun campo está vacío'})
                    return
                }
            })
            .catch(err => console.log(err))

        Coaster 
            .findByIdAndUpdate(id, {name, description, length, inversions, park_id})
            .then( () => res.redirect("/coasters") )
            .catch(err => console.log(err))

})

router.get("/:id", (req, res) => {

    const { id } = req.params

    Coaster
        .findById(id)
        .populate("park_id")
        .then((coaster)=>{
            res.render("pages/coasters/coaster-details", {coaster, isADMIN: req.session.currentUser?.role === 'ADMIN'})
        })  
        .catch(err => console.log(err))

})



module.exports = router
