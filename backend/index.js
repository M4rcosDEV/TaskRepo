import express from 'express'
import cors from 'cors'
import launchRouter from './routes/launchRouter.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use("/launch", launchRouter)

app.get("/", (req, res)=>{
    res.send("api saude")
})

app.listen(9000, () => {
    console.log("API RODANDO NA PORTA 9000")
})