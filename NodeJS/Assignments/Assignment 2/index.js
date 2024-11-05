import router from "./Routes/weatherRouter.js"
import express from "express"
import dotenv from "dotenv"

dotenv.config({path: "config.env"})

const app = express()
const PORT =  process.env.PORT || 3000

app.use(express.json())
app.use("/api/v1/weather/", router)
app.get("/", (req, res) => {
    res.status(200).send("Welcome to our Weather API")
})
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})