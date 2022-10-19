import User from "../models/User"
import jwt from "jsonwebtoken"

const SECRET = "nsan12376iojnda"

export const signIn = async (req,res) =>{
    
    const userFound = await User.findOne({username: req.body.username}); 
    if (!userFound) return res.status(400).json({message: "User not found"})
    const token = jwt.sign({id: userFound._id}, SECRET, {
        expiresIn: 86400
    })
    res.json({token: token})
}