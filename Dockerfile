FROM node:8-slim

ARG SOCKETIO_HOST="/"

WORKDIR /opt/app

COPY package*.json ./
COPY client/package*.json ./client/

RUN npm install
RUN npm install --prefix client

COPY . ./

RUN npm run build && \
  echo "REACT_APP_SOCKETIO_HOST=$SOCKETIO_HOST" > client/.env && \
  GENERATE_SOURCE_MAP=false npm run build --prefix client && \
  rm -rf client/node_modules

EXPOSE 8000
CMD ["npm", "start"]