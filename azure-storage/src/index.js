const express=require("express")
const azure = require('azure-storage')

const app=express()

// give these using set command in cmd
const PORT = process.env.PORT
const STORAGE_ACCOUNT_NAME=process.env.STORAGE_ACCOUNT_NAME
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY

function createBlobService(){
    const blobService = azure.createBlobService(STORAGE_ACCOUNT_NAME,STORAGE_ACCESS_KEY);
    return blobService;
}

app.get("/video",(req,res)=>{
    const videoPath=req.query.path;
    const blobService = createBlobService()
    const containerName = "video"
    blobService.getBlobProperties(containerName,videoPath,(err,properties)=>{
        if (err){
            // .. error handling
            res.sendStatus(500)
            return;
        }
        res.writeHead(200,{
            "Content-Length": properties.contentLength,
            "Content-Type": "video/mp4"
        })
        blobService.getBlobToStream(containerName,videoPath,res,err => {
            if (err){
                res.sendStatus(500);
                return;
            }
        })
    })
})

app.listen(PORT,()=>{
    console.log(`Microservice azure storage online`)
})


// set the three variables and do npm start
// http://localhost:3000/video?path=vid1.mp4