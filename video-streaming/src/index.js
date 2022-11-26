const express = require("express")
const fs = require("fs")
const path = require("path");
const http=require("http")
const amqp = require("amqplib");
const RABBIT = process.env.RABBIT;

function connectRabbit(){
    return amqp.connect(RABBIT)
      .then((messagingConnection)=>{
        return messagingConnection.createChannel();
      })
}

function sendViewedMessage(messageChannel,videoPath){
    const msg={videoPath: videoPath}
    const jsonMsg=JSON.stringify(msg)  // rabbitmq needs to manually serialize
    messageChannel.publish("","viewed", Buffer.from(jsonMsg))
}


function setupHandlers(app, messageChannel){
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
        sendViewedMessage(messageChannel, videoPath)
    })
}

function startHttpServer(messageChannel){
    return new Promise(resolve=>{
        const app=express();
        setupHandlers(app, messageChannel);
        const port = process.env.PORT || 3000;
        app.listen(port,()=>{
            resolve();
        })
    })
}

function main(){
    return connectRabbit()
      .then(messageChannel =>{
        return startHttpServer(messageChannel)
      })
}

main()
  .then(()=>console.log('Microservice video-streaming online'))
  .catch(err =>{
    console.error("microservice failed to start");
    console.error(err && err.stack || err);
  })