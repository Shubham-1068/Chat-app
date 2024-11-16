const mongoose = require("mongoose")

async function mongoConnect(URL) {
    mongoose.connect(URL).then(()=>{console.log("Database connected");}).catch((err)=>{console.log(err);})
}

module.exports = {mongoConnect}