FROM node:16-alpine
#Create app directory
WORKDIR /usr/src/app
#install all dependencies
COPY package*.json ./
RUN npm install --only=production
COPY . .
CMD npm start