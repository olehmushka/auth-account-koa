FROM node:24-alpine

RUN apk add bash

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN yarn install --ignore-optional --silent

EXPOSE 3000

CMD ["yarn", "start:prod"]
