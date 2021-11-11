const express=require("express");

const router=express.Router()
router.get("/proyectos", (req, res)=> { //ruta editable
    res.send("Proyectos en la base de datos")
})

module.exports=router;