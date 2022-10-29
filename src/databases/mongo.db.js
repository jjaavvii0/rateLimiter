import mongoose from "mongoose"

mongoose.connect(process.env.DB_MONGO_URI || "mongodb://127.0.0.1/usersOutvio", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log(process.pid + ": Connected to NODEJS"))
    .catch(error => console.log(error))


