# Creating a history microservice

- For simplicity, we take only two microservices. That is **video-streaming** and **history**
- The video-streaming microservice is same as in stage1. That is we stream video from here itself
- We have an additional function **sendViewedMessage()** . This function sends a http request to history microservice endpoint **http://history/viewed** with response body of videoPath
- This function is triggered when we hit the /video enpoint of video-streaming.
- Now, in history microservice, we get videopath from request, then we connect to db service, create database, collection and then insert document with videoPath using insertOne() method

![image](https://user-images.githubusercontent.com/116954249/207384711-4ea0ceee-d811-4895-895c-45b2cc94a9e9.png)
