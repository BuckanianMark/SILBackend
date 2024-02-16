import User from '../models/user.js'

export const getAllUsers =  async (req,res) => {
    try {
        const data =  await User.find({}).populate("albums","Title")
        if(data !== ''){
            return res.status(200).send(data)
        }else{
            return res.status(400).send({success:false,msg:"No data was found"})
        }
    } catch (error) {
        return res.status(500).send("Server Breakdown")
    }
 

}


export const getUserById = async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({_id:userId}).populate("albums","Title")
        if(user !== ''){
            return res.status(200).send(user)
        }
        return res.status(404).send("User not found!!")
        
    } catch (error) {
        res.status(500).send("Server Breakdown")
    }

}

export const addAlbumsToUser = async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.find({_id:userId})
        if(user === ''){
            return res.status(404).json({ message: 'User not found' });
        }
        user.albums.push(req.body.album);  

        await user.save();
        return res.status(200).json({ message: 'Album added to user successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const createUser =  async(req,res) => {
    try {
        if(req.body !== ''){
            const newuser = new User({
                name:req.body.name,
                email:req.body.email,
                userName:req.body.userName,
                albums:req.body.albums
            })
            await newuser.save();
            return res.status(200).send("User created successfully")
        }else{
            res.status(400).send("Bad Request")
        }
    } catch (error) {
        return res.status(500).send("Server error")
    }
}