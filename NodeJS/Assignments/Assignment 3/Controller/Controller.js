import url from '../Model/Url.js'
import ShortUniqueId from 'short-unique-id'

export const createShortUrl= async(req, res)=> {
    const {url}= req.body

    if(!url) {
        return res.status(400).json({error: 'URL is Required.'})
    }try {
        const shortId= new ShortUniqueId({length: 6}).randomUUID()
        const newUrl= new url({originalUrl: url, shortId})
        await newUrl.save()
        const shortUrl= `${req.protocol}://${req.get('host')}/${shortId}`
        res.status(201).json({shortUrl})
    }catch(err) {
        res.status(500).json({error: `Server Error: ${err}`})
    }
}

export const redirectToOriginalUrl = async (req, res) => {
    const {shortId} = req.params

    try {
        const url = await url.findOne({shortId})
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
        const urls = await url.find()
        res.status(200).json(urls)
    }catch(err) {
        res.status(500).json({ error: `Server Error : ${err}`})
    }
}

export const deleteUrl = async (req, res) => {
    const { shortId } = req.params

    try {
        const url = await url.findOne({shortId});
        const deletedUrl = await url.findByIdAndDelete(url._id)
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
        const urlExists = await url.findOne({ shortId })
        const updatedUrl = await url.findByIdAndUpdate(urlExists._id, {originalUrl: url}, {new: true})
        if (!updatedUrl || !urlExists) {
            return res.status(404).json({error: 'URL Not Found'})
        }
        res.status(200).json({message: 'URL Updated', data: updatedUrl})
    }
    catch(err){
        res.status(500).json({ error: `Server Error : ${err}`})
    }
}