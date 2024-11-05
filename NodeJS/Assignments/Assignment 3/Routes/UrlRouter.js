import express from 'express';
import { 
    createShortUrl, redirectToOriginalUrl, 
    deleteUrl, updateUrl,showAllUrls 
} from '../Controller/Controller.js'

const router = express.Router()

router.route('/')
.post(createShortUrl)
.get(showAllUrls)

router.route('/:shortId')
.get(redirectToOriginalUrl)
.delete(deleteUrl)
.put(updateUrl)

export default router;