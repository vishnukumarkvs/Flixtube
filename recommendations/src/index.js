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
      console.log("(rec)Received a 'viewed' message:");
      console.log(JSON.stringify(parsedMsg, null, 4)); 

      return videoCollection.insertOne({videoPath: parsedMsg.videoPath})
        .then(()=>{
          messageChannel.ack(msg);
        })
    } 
    return messageChannel.assertExchange("viewed","fanout")
      .then(()=>{
        return messageChannel.assertQueue("",{exclusive: true})  //creates anonymous queue. exclusive set to true so that it deallocates once done
      })
      .then(response=>{
        const queueName = response.queue; //gives the queue a name which is an automatically generated unique identifier
        console.log(`Consumed by recommendation microservice, ${queueName}`)
        
        return messageChannel
          .bindQueue(queueName, "viewed", "")  //binds the anonymous queue with erxchange
            .then(()=>{
              return messageChannel.consume(queueName,consumeViewedMessage) //consumes messages
            })
      })

      // The viewed exchange is shared among all microservices, but the anonymous queue is owned solely by this microservice. 
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
    return connectDB()
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
  