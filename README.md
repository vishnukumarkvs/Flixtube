# Connecting frontend to backend
- Here, we have two services **frontend** and **video-streaming**
- frontend microservice is a simple react app
- In video-streaming microservice, it sends video file on endpoint /video using sendFile() method
- In frontend, we use a video tag to stream video
```
<video  controls  muted>
     <source  src="http://localhost:4000/video"  type="video/mp4"></source>
</video>
```
- As usual, we create dockerfiles for two services and use docker-compose to start two services
- I have given specific port 3001 for frontend. To access react app, run on it
- ```localhost:3001```