import express from "express"    
import morgan from "morgan"

import authRoutes from "./routes/auth.routes"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.get("/", (req, res) =>{
    res.json({
        status: "Working" 
    })
})

app.use("/api/auth", authRoutes);

export default app;