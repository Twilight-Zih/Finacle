import express from "express"
import {
    showAllDetails, showRainDetails, updateCityTempDetails,
    addNewCityTempDetails, changeRainDetails, removeCityDetails,
    showCityDetails
} from "../Handler/weatherHandler.js"

const router = express.Router()
router.get("/", showAllDetails)
router.get("/rain", showRainDetails)
router.post("/add", addNewCityTempDetails)
router.put("/changeRain/:city", changeRainDetails)
router.put("/update/:city", updateCityTempDetails)
router.delete("/remove/:city", removeCityDetails)
router.get("/city/:city", showCityDetails)

export default router