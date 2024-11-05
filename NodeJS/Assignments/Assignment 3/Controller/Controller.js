import Url from '../Model/Url.js'
import ShortUniqueId from 'short-unique-id'

export const createShortUrl= async(req, res)=> {
    const {url}= req.body

    if(!url) {
        return res.status(400).json({error: 'URL is Required.'})
    }try {
        const shortId= new ShortUniqueId({length: 6}).randomUUID()
        const newUrl= new Url({originalUrl: url, shortId})
        await newUrl.save()
        const shortUrl= `${req.protocol}://${req.get('host')}/${shortId}`
        res.status(201).json({shortUrl})
    }catch(err) {
        res.status(500).json({error: `Server Error: ${err}`})
    }
}

export const redirectToOriginalUrl = async (req, res) => {
    const {shortId} = req.params
    console.log(shortId)
    try {
        const url = await Url.findOne({shortId})
        console.log(url)
        if (!url) {
            return res.status(404).json({ error: 'URL Not Found'})
        }
        res.redirect(url.originalUrl);
    }catch(err) {
        res.status(500).json({ error: `Server Error : ${err}`});
    }
}

export const showAllUrls = async (req, res) => {
    try {
        const urls = await Url.find()
        res.status(200).json(urls)
    }catch(err) {
        res.status(500).json({ error: `Server Error : ${err}`})
    }
}

export const deleteUrl = async (req, res) => {
    const { shortId } = req.params

    try {
        const url = await Url.findOne({shortId});
        const deletedUrl = await Url.findByIdAndDelete(url._id)
        if (!url || !deletedUrl) {
            return res.status(404).json({ error: 'URL Not Found' })
        }
        res.status(200).json({message: 'URL Deleted', data: deletedUrl})
    }catch(err) {
        res.status(500).json({ error: `Server Error : ${err}`})
    }
}

export const updateUrl = async (req, res) => {
    const { shortId } = req.params
    const { url } = req.body
    if (!url) {
        return res.status(400).json({ error: 'URL Body is Required'})
    }
    try {
        const urlExists = await Url.findOne({ shortId })
        const updatedUrl = await Url.findByIdAndUpdate(urlExists._id, {originalUrl: url}, {new: true})
        if (!updatedUrl || !urlExists) {
            return res.status(404).json({error: 'URL Not Found'})
        }
        res.status(200).json({message: 'URL Updated', data: updatedUrl})
    }
    catch(err){
        res.status(500).json({ error: `Server Error : ${err}`})
    }
}