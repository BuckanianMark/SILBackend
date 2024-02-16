import { getAllAlbums, getAlbumById, addAlbum } from '../controllers/albums.controller.js'
import express from 'express'
const router = express.Router()

router.post("/addAlbum",addAlbum)
router.get("/getAllAlbums", getAllAlbums)
router.get("/:id",getAlbumById)
router.get("/user/:id")


export default router