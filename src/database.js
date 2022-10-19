import mongoose from "mongoose"

mongoose.connect("mongodb://localhost/usersOutvio", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("DB Connected"))
    .catch(error => console.log(error))