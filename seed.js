const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")



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


async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}









async function seedZaids(){
    await conntectToDB()
    
    const seededZaids = await Zaid.insertMany([
        {
            name: 'Zaid Classic',
            zaidImage: 'https://github.com/SEB-16-Bahrain/assets/blob/main/zaid-real-image.png?raw=true',
            isPublic: true
        },
        {
            name: 'Zaid AI',
            zaidImage: 'https://github.com/SEB-16-Bahrain/assets/blob/main/zaid-ai-image.png?raw=true',
            isPublic: true
        },
        {
            name: 'Pirate Zaid',
            zaidImage: 'https://github.com/SEB-16-Bahrain/assets/blob/main/zaid-pirate.png?raw=true',
            isPublic: true
        },
        {
            name: 'Detective Zaid',
            zaidImage: 'https://github.com/SEB-16-Bahrain/assets/blob/main/detective-zaid.png?raw=true',
            isPublic: true
        },
    ])

    console.log('Data Seeded Successfully')

    await mongoose.disconnect()
}

seedZaids()