import express from "express"    
import morgan from "morgan"


import authRoutes from "./routes/auth.routes"
import privateRoutes from "./routes/private.routes"
import publicRoutes from "./routes/public.routes"


const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.get("/", (req, res) =>{
    res.json({
        status: "Working" 
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/private", privateRoutes);
app.use("/api/public", publicRoutes);


export default app;