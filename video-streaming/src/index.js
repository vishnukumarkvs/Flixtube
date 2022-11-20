const express = require("express")
const fs = require("fs")
const path = require("path");

const app = express();
if(!process.env.PORT){
    throw new Error("Please specify port using env variable PORT");
}

const PORT = process.env.PORT;
// const PORT=3000;

app.get("/",(req,res)=>{
    res.send("Hello buddy")
})

app.get("/video",(req,res)=>{
    const vpath=path.join("./videos","vid1.mp4");
    //check status of file
    fs.stat(vpath,(err,stats)=>{
        if(err){
            console.log("An error occured");
            res.sendStatus(500);
            return;
        }
        res.writeHead(200,{
            "Content-Length":stats.size,
            "Content-Type":"video/mp4",
        });
        fs.createReadStream(vpath).pipe(res)
    });
});

app.listen(PORT,()=>{
    console.log(`First example app listening on port ${PORT}, point your browser at http://localhost:${PORT}`);
})