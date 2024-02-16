import User from '../models/authUser.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req,res) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
    const dbUser = await newUser.save();
    res.status(200).send(generateToken(dbUser))
    //return res.status(200).send("User Created Successfully!!")
}

export const login = async (req,res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send("User Not Found!!")
        }
        const IsPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!IsPasswordCorrect){
            return res.status(400).send("Password is incorrect!!")
        }
        res.send(generateToken(user));
    } catch (error) {
        res.status(500).send("Server Breakdown")
    }
}

const generateToken = (user) => {
    const token = jwt.sign({
        email:user.email,
        password:user.password
    },"Some text whatsoever",{
        expiresIn:"30d"
    })
    user.token = token
    return user;
}




