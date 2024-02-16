import photo from '../models/photos.js'

export const addPhoto = async (req,res) => {
    try {
        if(req.body !== ''){
            const newPhoto = new photo({
                AlbumId:req.body.AlbumId,
                photoTitle:req.body.photoTitle,
                ImageUrl:req.body.ImageUrl
            })
            await newPhoto.save();
            return res.status(200).send(newPhoto)
        }
    } catch (error) {
        res.status(500).send("Internal server error")
    }

}
export const getPhoto = async (req,res) => {
    try {
        const photoId = req.params.id;
        const Photo = await photo.findOne({_id:photoId});
        if (Photo !== '') {
            res.status(200).send(Photo);
        } else {
            res.status(404).send("Photo was not found");
        }
    } catch (error) {
        res.status(500).send("Internal server error") 
    }
}

export const editPhotoTitle = async (req,res) => {
    try {
        const photoId = req.params.id;
        const newTitle = req.body.newTitle;
        const Photo = await photo.findOne({_id:photoId})
        if(Photo === ''){
            return res.status(404).send("Photo was not found")
        }else{
            Photo.photoTitle = newTitle

            await Photo.save();
            res.status(200).send(Photo)
        }
       
    } catch (error) {
        res.status(500).send("Internal server error")
    }
}

export const getPhotos = async (req,res) => {
    try {
       const photos = await photo.find({}).populate("AlbumId")
       if(photos !== ''){
        return res.status(200).send(photos)
       }else{
        return res.status(404).send("No photos found")
       }
    } catch (error) {
        return res.status(500).send("Server Breakdown!!")
    }
}
