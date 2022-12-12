# Simple nodejs video-streaming microservice

- We have a vid1.mp4 video files in video folder
- We have an express app that streams the video file
- Using fs.createReadStream() method
- We have a Dockerfile. It copies necessary files and folders, installs dependencies and starts the service
- We can either create docker image using dockerfile and start the service or use docker-compose
- ```docker build -t video-streaming --file Dockerfile . {-t tagging, . in current dir}```
- ``` docker run -d -p 3001:3000 video-streaming```
- Or as said, create docker-compose file. Use ```docker-compose up --build``` to start the service
