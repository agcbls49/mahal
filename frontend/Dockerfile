# use node version 22 as base image
FROM node:22

# go to the app directory
WORKDIR /app

# copy package and package-lock.json
COPY package*.json ./

# install app dependencies
RUN npm install

# copy code into the docker image 
COPY . .

EXPOSE 3000

# run the server
CMD ["npm", "run", "dev"]