// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const Zaid = require('./models/Zaid.js')
const methodOverride = require('method-override')
const morgan = require('morgan')



async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}




conntectToDB() // connect to database






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))





// Routes go here

app.get('/',(req,res)=>{
    res.render('homepage')//removed '.ejs' as it's not needed
})



app.get('/zaid', async (req,res)=>{ //adding / zaid 
    const allZaids = await Zaid.find()
    res.render('all-zaids',{zaids: allZaids}) //removed '.ejs' as it's not needed
})

app.get('/zaid/new', (req, res)=>{  //changed to correct route for creating a new zaid
    res.render('create-zaid') // removed './views/' as it's not needed
})

app.post('/zaid', async (req,res)=>{

    try{
    req.body.isPublic = Boolean(req.body.isPublic)
    const createdZaid = await Zaid.create(req.body)
    res.redirect('/zaid')

    }
    catch(err){
        console.log(err)
    }
    
})


app.get('/zaid/:zaidId', async (req,res)=>{
    const foundZaid = await Zaid.findById(req.params.zaidId)
    res.render('zaid-details',{zaid: foundZaid})
})



app.delete('/zaid/:id',async(req,res)=>{
    await Zaid.findByIdAndDelete(req.params.id)
    res.redirect('/zaid')
})




app.listen(3000,()=>{
    console.log('App is Running')
}) // listen on port 3000
