npm install --only=production 
download packages required only for production. No dev dependencies

nodemon
for live reloading
it restarts server on detection of code change
npm install --save-dev nodemon

npm start
npm run start:dev

RUN - to run something during build process
CMD - this command is invoked when a container is initiated


docker build -t video-streaming --file Dockerfile .  {-t tagging, . in current dir}

To check our image
docker run -d -p 3001:3000 video-streaming
-d detached mode, run in background
-p port binding, port forwarding

docker ps or docker container ls (To check running containers)
docker logs <container_id>

Try other
docker run -p 27017:27107 mongo:latest

To push to registry
docker login <reg-url> --username <...> --password <...>
docker login kvsreg.azurecr.io --username kvsreg --password <...>

before push, tag the image
docker tag video-streaming kvsreg.azurecr.io/video-streaming:1.0.0
docker push kvsreg.azurecr.io/video-streaming:1.0.0

docker exec -it lucid_mclaren /bin/sh
exit
--------------------------------------------------------

use mongodb for database and azure storage for storing assets
Docker Compose allows us to configure, build, run, and manage multiple containers at the same time.

put each microservice in its own directory

create docker-compose file

we keep restart=no so that we dont miss if microservice fail. We do opposite in production

docker-compose up --build (if no build, it just starts container from previously built one. If changes made, they wont effect. So always use --build for best practice)

docker-compose ps, docker ps
docker-compose stop, ctrl+c (container is still present)
docker-compose down (preffered)

reboot
docker-compose down && docker-compose up --build

Azure Storage
Create a storage account
create a container video with private access
upload video into the container

Creating new microservice
create folder azure-storage
npm init
npm install --save azure-storage

Use blobservice to get and stream data

Video-streaming-1
Forward requests to video-storage
Check index.js file for extra info
build docker compose
http://localhost:4001/video
http://localhost:4000/video?path=vid1.mp4

In production, we can restrict second microservice

Use cloud storage rather than cluster storage. It makes cluster stateless
