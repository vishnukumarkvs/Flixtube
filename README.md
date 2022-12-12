# Creating two microservices and connecting them

- Here, we have two microservices: video-streaming and azure-storage
- The azure-storage microservice is same as before. It gets video filename from query string and streams it on browser
- We also have video-streaming microservice whose function is to forward http request to azure-storage service
- In video-streaming microservice, we create a request using http.request() method inside /video endpoint
- In the request body, we send host and port of azure0storage containername and port
- Next, we send ```path="/video?path=vid1.mp4"```
- When we hit the endpoint, it simply forwards a http request and then the azure-storage service gets all details and streams the video
- Run both services at same time using docker-compose
- You can also directly stream from azure-storage service itself.
- Here, we can think of video-streaming as frontend and azure-storage as backend
