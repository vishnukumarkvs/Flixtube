# Creating 3rd microservice which is a database(mongodb) that stores metadata of video

- Earlier, we have created two microservices. Now, we create a 3rd microservice which is a mongodb database.
- Use docker-compose and create all 3 microservices(db, video-streaming, azure-storage)
- Connect video-streaming to db with DBHOST env variable which is **mongodb://db:27017**
- Now, run docker-compose and start all the 3 services
- Install Studio 3T and connect to mongodb. Connection would be *localhost:4000*
- In monogodb, first we create a database with name: *video-streaming*, and then we create a collection with name: *videos*
- Next, inside the collection we insert a document of type json
```
{                                                     
    "_id" : { "$oid": "5d9e690ad76fe06a3d7ae416" },
    "videoPath" : "vid1.mp4"      
}
```
- Here, what happens in video-streaming service that  we connect to the mongodb database, get the data which is videoPath and then create a http Request with data and forward it to azure-storage service
- Now, run the request in browser to stream video
- http://localhost:4002/video?id=5d9e690ad76fe06a3d7ae416
- For production, I recommend using a database external to the Kubernetes cluster. It makes the cluster stateless.
- Each microservice should have its own database
