import app from "./app"
import "./databases/mongo.db"
import "./databases/redis.db"
require('dotenv').config()


const PORT = process.env.PORT || 3000;


app.listen(PORT)
console.log("Server listen on port", PORT)
