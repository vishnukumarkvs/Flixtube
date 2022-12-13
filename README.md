# Creating a history microservice

- For simplicity, we take only two microservices. That is **video-streaming** and **history**
- The video-streaming microservice is same as in stage1. That is we stream video from here itself
- We have an additional function **sendViewedMessage()** . This function sends a http request to history microservice endpoint **http://history/viewed** with response body of videoPath
- This function is triggered when we hit the /video enpoint of video-streaming.
- Now, in history microservice, we get videopath from request, then we connect to db service, create database, collection and then insert document with videoPath using insertOne() method
- Once started, go to # localhost:4002/video. You can see video as well as recoed added meassage in console and also that record in mongodb using studio 3t
- 
![image](https://user-images.githubusercontent.com/116954249/207384711-4ea0ceee-d811-4895-895c-45b2cc94a9e9.png)

### Additional info - also important
- Here, we have two docker files for each microservice: **Dockerfile-dev** and **Dockerfile-prod**.
- *prod* file is same as all earlier dockerfiles where we copy src and all other folders. But in *dev* file, we dont add source code, instead we use bind mounts
- We use docker volumes to mount our src/ folder. This makes development uninterrupting. Check docker-compose file for instructions
- https://docs.docker.com/storage/bind-mounts/
- Also, add nodemon --legacy-watch ./src/index.js. in package.json
- direct messaging - synchronous - http (post request)
- indirect messaging - async - rabbitmq
- direct message - highly coupled - single microservice couple
