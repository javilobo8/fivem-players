FROM node:8-slim

WORKDIR /opt/app

COPY package*.json ./
COPY client/package*.json ./client/

RUN npm install
RUN npm install --prefix client

COPY . ./

# add GENERATE_SOURCE_MAP=false
RUN npm run build && \
  npm run build --prefix client && \
  rm -rf client/node_modules

EXPOSE 8000
CMD ["npm", "start"]