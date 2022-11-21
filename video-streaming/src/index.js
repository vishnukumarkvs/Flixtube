const express = require("express")
const http=require("http")
const mongodb=require("mongodb")

const app = express();

if(!process.env.PORT){
    throw new Error("Please specify port using env variable PORT");
}
const PORT = process.env.PORT;

const VIDEO_STORAGE_HOST=process.env.VIDEO_STORAGE_HOST
const VIDEO_STORAGE_PORT=process.env.VIDEO_STORAGE_PORT
console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

const DBHOST=process.env.DBHOST
const DBNAME=process.env.DBNAME

function main(){
    return mongodb.MongoClient.connect(DBHOST)
        .then(client =>{
            const db=client.db(DBNAME)
            const videoCollection=db.collection("videos")

            app.get("/video",(req,res)=>{
                const videoId= new mongodb.ObjectId(req.query.id);
                videoCollection.findOne({_id:videoId})
                  .then(videoRecord => {
                    if (!videoRecord){
                        res.sendStatus(400);
                        return;
                    }
                    console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);

                    const forwardRequest= http.request({
                        host: VIDEO_STORAGE_HOST,
                        port: VIDEO_STORAGE_PORT,
                        path: `/video?path=${videoRecord.videoPath}`,
                        method: 'GET',
                        headers: req.headers
                    },
                    forwardResponse =>{
                        res.writeHeader(forwardResponse.statusCode,forwardResponse.headers);
                        forwardResponse.pipe(res)
                    })
                    req.pipe(forwardRequest);
                  })
                  .catch(err=>{
                    console.error("Database query failed");
                    console.error(err && err.stack || err);
                    res.sendStatus(500)
                  })
            })

            app.listen(PORT, ()=>{
                console.log(`Microservice listening, please load the data file db-fixture/videos.json into your database before testing this microservice.`)
            })
        })
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });