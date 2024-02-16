import express from 'express'
import { addPhoto, editPhotoTitle, getPhoto, getPhotos } from '../controllers/photos.controller.js'
const router = express.Router()

router.post("/addPhoto",addPhoto)
router.get("/getPhotos", getPhotos)
router.get("/:id",getPhoto )
router.put("/newTitle/:id",editPhotoTitle)


export default router