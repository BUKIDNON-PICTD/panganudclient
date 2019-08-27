#The instructions for the first stage
FROM node:10-alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY package*.json ./
# RUN npm install -g nodemon
RUN npm install

# The instructions for second stage
FROM node:10-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=builder node_modules node_modules

COPY . .
CMD [ "npm","run", "start" ]