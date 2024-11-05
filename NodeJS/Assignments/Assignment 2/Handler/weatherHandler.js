import { weatherData } from '../Data/weatherData.js'

export const showAllDetails = (req, res) => {
    res.status(200).json(weatherData)
}

export const showRainDetails = (req, res) => {
    const rainDetails = weatherData.filter((data) => data.rain.status === true)
    res.status(200).json(rainDetails)
}

export const addNewCityTempDetails = (req, res) => {
    const { city, temp, rain } = req.body
    weatherData.push({ city, temp, rain })
    res.status(200).json({ message: "City added successfully", weatherData})
}

export const changeRainDetails = (req, res) => {
    const c = req.params.city.toLowerCase()
    const index = weatherData.findIndex((city) => city.city.toLowerCase()=== c)

    if (index !== -1) {
        weatherData[index].rain.status = false
        res.status(200).json({ message: "Rain details changed successfully", weatherData })
    } else {
        res.status(404).json({ message: "City not found" })
    }
}

export const removeCityDetails = (req, res) => {
    const c = req.params.city.toLowerCase()
    const index = weatherData.findIndex((city) => city.city.toLowerCase()=== c)

    if (index !== -1) {
        weatherData.splice(index, 1)
        res.status(200).json({ message: "City removed successfully", weatherData })
    } else {
        res.status(404).json({ message: "City not found" })
    }
}

export const showCityDetails = (req, res) => {
 const c = req.params.city.toLowerCase()
 const cityDetails = weatherData.find((city) => city.city.toLowerCase()=== c)

    if (cityDetails) {
        res.status(200).json(cityDetails)
    } else {
        res.status(404).json({ message: "City not found" })
    }
}

export const updateCityTempDetails = (req, res) => {
    const { city, temp, rain } = req.body
    const c = req.params.city.toLowerCase()
    const index = weatherData.findIndex((city) => city.city.toLowerCase()=== c)

    if (index !== -1) {
        weatherData[index] = { city, temp, rain }
        res.status(200).json({ message: "City details updated successfully", weatherData })
    } else {
        res.status(404).json({ message: "City not found" })
    }
}