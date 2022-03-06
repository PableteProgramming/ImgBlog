const express= require('express')
const uploadsRouter= require('./routes/uploads')

const app= express()

app.set('view engine', 'ejs')

app.use('/uploads',uploadsRouter)



app.get("/",(req,res) => {
    res.send("Working")
})


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})