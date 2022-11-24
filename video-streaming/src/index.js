const express = require("express")
const fs = require("fs")
const path = require("path");
const http=require("http")

function sendViewedMessage(videoPath){
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const requestBody = {
        videoPath: videoPath
    }
    const req=http.request(
        "http://history/viewed",
        postOptions
    )
    req.on("close",()=>{})
    req.on("error",(err)=>{})
    req.write(JSON.stringify(requestBody))
    req.end()
}


function setupHandlers(app){
    app.get("/video",(req,res)=>{
        const videoPath="./videos/vid1.mp4"
        fs.stat(videoPath, (err,stats)=>{
            if(err){
                console.error("Error occured");
                res.sendStatus(500);
                return;
            }
            res.writeHead(200,{
                "Content-Type": "video/mp4",
                "Content-Length": stats.size
            })
            fs.createReadStream(videoPath).pipe(res);
            
        })
        sendViewedMessage(videoPath)
    })
}

function startHttpServer(){
    return new Promise(resolve=>{
        const app=express();
        setupHandlers(app);
        const port = process.env.PORT || 3000;
        app.listen(port,()=>{
            resolve();
        })
    })
}

function main(){
    return startHttpServer();
}

main()
  .then(()=>console.log('Microservice video-streaming online'))
  .catch(err =>{
    console.error("microservice failed to start");
    console.error(err && err.stack || err);
  })