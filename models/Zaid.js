const mongoose = require('mongoose') //change to mongoose 


// Schema
const zaidSchema = new mongoose.Schema({
    name:{
        type: String
    },
    zaidImage:{
        type: String
    },
    isPublic:{
        type: Boolean
    }
})


// model
const Zaid = mongoose.model('Zaid',zaidSchema)

module.exports = Zaid  //change to ecports 