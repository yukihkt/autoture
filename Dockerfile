# just ignore the docker build files first, need to combine with the hyperledger docker-compose so that the mongoose could run on the docker too.

FROM node:16.15

COPY package*.json .
WORKDIR /app
RUN npm install
EXPOSE 8080
COPY . .


CMD ["npm", "run", "start"]
# CMD npm run start - run this when production server

