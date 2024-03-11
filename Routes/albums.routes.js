import { getAllAlbums, getAlbumById, addAlbum, getPaginatedAlbums } from '../controllers/albums.controller.js'
import express from 'express'
const router = express.Router()

router.post("/addAlbum",addAlbum)
router.get("/getAllAlbums", getAllAlbums)
router.get("/getpaginatedAlbums", getPaginatedAlbums)
router.get("/:id",getAlbumById)
router.get("/user/:id")


export default router