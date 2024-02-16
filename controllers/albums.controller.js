import Album from '../models/album.js'

export const getAllAlbums = async (req,res,next) => {
    try {
        const albums = await Album.find({}).populate("User","name")
        if(albums !== ''){
            res.status(200).send(albums)
        }else{
        res.status(404).send("No album Found!")
        }
    } catch (error) {
        res.status(500).send("Server Breakdown!!")
    }
}

export const getAlbumById = async (req,res,next) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById({_id:albumId}).populate("User")
        if(!album){
            return res.status(404).send("Album not found")
        }
        res.status(200).send(album)
    } catch (error) {
        res.status(500).send("Server Breakdown!!") 
    }
}

export const addAlbum = async (req,res,next) => {
    try {
        if(req.body !== ''){
            const newAlbum = new Album({
               User:req.body.User,
               Title:req.body.Title 
            })
            await newAlbum.save();
            return res.status(201).send({message:"Album Created",newAlbum})
        }else if(req.body.User === '' && req.body.Title === ''){
            return res.status(400).send("Bad Request")
        }
    } catch (error) {
        res.status(500).send("Server Breakdown!!") 
    }
}