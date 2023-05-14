#! /bin/bash
FROM node:16-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

COPY ./ ./

RUN npm i

EXPOSE 4001

CMD ["npm", "run", "start"]