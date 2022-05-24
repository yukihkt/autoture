# just ignore the docker build files first, need to combine with the hyperledger docker-compose so that the mongoose could run on the docker too.

FROM node:16.15


WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD npm run serve

WORKDIR /server
COPY server/package*.json .
RUN npm install
COPY /server/. /server/.
CMD npm run dev
# CMD npm run start - run this when production server

