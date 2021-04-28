FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD docker-resources/node/package.json package.json

RUN npm install express
RUN npm install mongoose

CMD [ "node", "app/server.js" ]
