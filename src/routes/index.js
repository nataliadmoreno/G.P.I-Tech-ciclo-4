const express=require("express");

const router=express.Router()

router.get("/", (req, res)=> {
    res.send("Hola grupos 16, 17 y 18, y demas compañeros")
})

router.get("/about", (req, res)=> {
    res.send("Esta es la pagina de acerca de :)")
})

module.exports=router;