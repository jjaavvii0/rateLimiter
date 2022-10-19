import jwt from "jsonwebtoken"
import User from "../models/User";

export const verifyToken = async (req, res, next) =>{
    try {
        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: "No se ha enviado un token"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id;
        console.log(decoded)

        const user = await User.findById(req.userId)
        if(!user) return res.status(404).json({message: "No user found"});

        console.log(user)
        next()    
    } catch (error) {
        return res.status(401).json({message: "No autorized"})   
    }
}