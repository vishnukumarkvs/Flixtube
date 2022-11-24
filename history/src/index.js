const express= require("express");
const mongodb=require("mongodb");
const bodyParser = require('body-parser');;

const DBHOST=process.env.DBHOST
const DBNAME=process.env.DBNAME

function connectDB(){
    return mongodb.MongoClient.connect(DBHOST)
      .then(client =>{
        return client.db(DBNAME)
      })
}

function setupHandlers(app, db){
    const videoCollection = db.collection("videos")
    // post request makes the entry to db. GET cant do it. If used get instead, the you need to do localhost:4001/viewed, inside things will run but undefined will be added as video-streaming is not getting pinged
    app.post("/viewed",(req,res)=>{
        const videoPath = req.body.videoPath
        videoCollection.insertOne({videoPath:videoPath})
          .then(()=>{
            console.log(`Added video ${videoPath} to history`)
            res.sendStatus(200)
          })
          .catch(err =>{
            console.error(`Error adding video ${videoPath} to database`)
            console.error(err && err.stack || err)
            res.sendStatus(500)
          })
    })
}

function startHttpServer(db){
    return new Promise(resolve=>{
        const app=express();
        app.use(bodyParser.json());
        setupHandlers(app,db);

        const port=process.env.PORT || 3000;
        app.listen(port,()=>{
            resolve();
        });
    });
}

function main(){
    console.log("Hello World");
    return connectDB(DBHOST)
      .then(db => {
        return startHttpServer(db);
      })
}

main()
  .then(
    ()=>console.log("Microservice online"))
    .catch(err=>{
        console.error("Microservice failed to start");
        console.error(err && err.stack || err);
    })
  