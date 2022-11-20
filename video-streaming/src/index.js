const express = require("express")
const http=require("http")

const app = express();

if(!process.env.PORT){
    throw new Error("Please specify port using env variable PORT");
}
const PORT = process.env.PORT;

const VIDEO_STORAGE_HOST=process.env.VIDEO_STORAGE_HOST
const VIDEO_STORAGE_PORT=process.env.VIDEO_STORAGE_PORT
console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

app.get("/",(req,res)=>{
    res.send("Hello buddy")
})

app.get("/video",(req,res)=>{
   const forwardRequest = http.request(
    {
        host: VIDEO_STORAGE_HOST,
        port: VIDEO_STORAGE_PORT,
        path: '/video?path=vid1.mp4',
        method: 'GET',
        headers: req.headers
    },
    forwardResponse =>{
        res.writeHeader(forwardResponse.statusCode,forwardResponse.headers);
        forwardResponse.pipe(res);
    }
   )
   req.pipe(forwardRequest);
});

app.listen(PORT,()=>{
    console.log(`Frontend online`);
})