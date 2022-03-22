const express= require('express')
const fs= require('fs')
const uploadsRouter= require('./routes/uploads')
const serveStatic= require('serve-static')
const fileUpload = require('express-fileupload');
const path= require('path')


const app= express()

app.set('view engine', 'ejs')
app.use(fileUpload());
app.use('/uploads',uploadsRouter)
app.use(serveStatic('public'))



app.get("/",(req,res) => {
    try{
        let content= fs.readdirSync("public/uploads")
        let imgs =["lul"]
        imgs=[]
        content.forEach(file=>{
            img={
                src:"uploads/"+file,
                alt:file
            }
            imgs.push(img)
        })
    
        res.render("index",{
            imgs:imgs
        })
    }
    catch(e){
        console.log(e)
    }
    
})

app.get("/upload",(req,res)=>{
    res.render('upload');
})

app.post("/upload",(req,res)=>{
    let upfile= req.files.upimage;
    let extension= path.extname(upfile.name);
    let filename=path.basename(upfile.name,extension);
    let pathh= "public/uploads/";
    let updest= pathh+filename+extension;
    let done=false;
    let index=1;
    while(done===false){
        if(fs.existsSync(updest)){
            updest= pathh+filename+index+extension;
            index=index+1;
        }else{
            done=true;
        }
    }
    upfile.mv(updest, (err) => {
        if (err) { 
            return res.status(500).send(err); 
        }
        res.redirect("/");
    });
})


app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})