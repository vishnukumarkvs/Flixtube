- Create a new service: db with mongodb image
- Use Studio 3T and connect: localhost:4000 (given port in docker-compose file)
- To load this data using Robo 3T, open that application, create a new database called video-streaming, create a collection called videos, and then insert a document into that collection. For our purposes, use the content from this listing.
- Create a record
{                                                     
    "_id" : { "$oid": "5d9e690ad76fe06a3d7ae416" },   
                                                      
    "videoPath" : "vid1.mp4"      
                                                      
}  

- To check, use url http://localhost:4002/video?id=5d9e690ad76fe06a3d7ae416

- For production, I recommend using a database external to the Kubernetes cluster. It makes the cluster stateless.
- Each microservice should have its own database