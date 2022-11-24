FROM node:16-alpine
#Create app directory
WORKDIR /usr/src/app
#install all dependencies
COPY package*.json ./
RUN npm install --only=production
COPY ./src ./src
COPY ./videos ./videos
CMD npm start