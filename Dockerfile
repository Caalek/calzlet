FROM node:current-alpine3.15

WORKDIR /app

RUN mkdir client
RUN mkdir server

COPY client /app/client/
COPY server /app/server/

COPY client/package*.json ./client/
COPY server/package*.json ./server/

RUN cd /app/client && npm install && npm run build
RUN cd /app/server && npm install

ENV ENV="prod"
ENV PORT=5000

CMD ["node", "server/server.js"]
EXPOSE 5000