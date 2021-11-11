const express=require("express");
const { route } = require(".");

const router=express.Router()

router.get("/usuarios/singin", (req, res)=> { //ruta editable
    res.send("Inciando sesión")
})

router.get("/usuarios/singup", (req, res)=> {
    res.send("Formulario de registro")
})

module.exports=router;