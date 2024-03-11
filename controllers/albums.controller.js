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

export const getPaginatedAlbums = async(req,res) => {
    try {
        const page = parseInt(req.query.page)  || 0 ;
        const limit = parseInt(req.query.limit) || 5;

        const albums = await Album.find({})
                .skip(page * limit)
                .limit(limit)
        console.log(albums)
        const total = await Album.countDocuments({})
        const response = {
            error:false,
            total,
            page:page+1,
            limit,
            albums
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).send("Server breakdown!!");
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