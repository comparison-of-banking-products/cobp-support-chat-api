FROM node:20
WORKDIR /cobp-support-chat-api
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8082
CMD ["npm", "start"]
