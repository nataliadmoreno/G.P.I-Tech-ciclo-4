import express from "express"
const app= express()
const port=5500
app.get("/", (req, res)=> {res.send("Hola somos el equipo G.P.I TECH ")})
app.listen(port, ()=>{console.log("Servidor activo y funcionando desde el puerto 5500")})