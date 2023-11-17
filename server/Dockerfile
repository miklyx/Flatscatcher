FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
ENV SERVER_PORT=3003
ENV SERVER_HOST=0.0.0.0
CMD ["node", "index.js"]