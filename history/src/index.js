const express= require("express");
const mongodb=require("mongodb");
const bodyParser = require('body-parser');
const amqp = require("amqplib");
const RABBIT = process.env.RABBIT; // URI for connecting to RabbitMq 

const DBHOST=process.env.DBHOST
const DBNAME=process.env.DBNAME

function connectRabbit(){
  return amqp.connect(RABBIT)
    .then(messagingConnection =>{
      return messagingConnection.createChannel();
    })
}

function connectDB(){
    return mongodb.MongoClient.connect(DBHOST)
      .then(client =>{
        return client.db(DBNAME)
      })
}

function setupHandlers(app, db, messageChannel){
    const videoCollection = db.collection("videos")
    function consumeViewedMessage(msg){                                   //function to handle incoming messages
      const parsedMsg = JSON.parse(msg.content.toString());               //rabbitmq doesnt natively support JSON

      return videoCollection.insertOne({videoPath: parsedMsg.videoPath})
        .then(()=>{
          messageChannel.ack(msg);
        })
    } 
    return messageChannel.assertQueue("viewed",{})  //creates a queue if not available
      .then(()=>{
        return messageChannel.consume("viewed",consumeViewedMessage) //starts recieving message from viewed queue
      })   
}

function startHttpServer(db,messageChannel){
    return new Promise(resolve=>{
        const app=express();
        app.use(bodyParser.json());
        setupHandlers(app,db, messageChannel);

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
        return connectRabbit()
          .then(messageChannel =>{
            return startHttpServer(db,messageChannel)
          })
      })
}

main()
  .then(
    ()=>console.log("Microservice online"))
    .catch(err=>{
        console.error("Microservice failed to start");
        console.error(err && err.stack || err);
    })
  