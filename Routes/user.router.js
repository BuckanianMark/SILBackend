import { addAlbumsToUser, createUser, getAllUsers, getUserById } from '../controllers/user.controller.js'
import express from 'express'
import user from '../models/user.js'
const router = express.Router()
import { sample_users } from '../data.js'

router.get("/getAllUsers", getAllUsers)
router.get("/:id",getUserById)
router.post("/addUser",createUser)
router.post("/addalbums/:id",addAlbumsToUser)
router.get('/seed', async(req,res) => {
    const usersCount = await user.countDocuments();
    if(usersCount >0 ){
       res.send("Seed is already Done")
       return; 
    }
    await user.create(sample_users)
    res.send("Seed is Done")
})

export default router