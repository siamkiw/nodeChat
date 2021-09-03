FROM node:12.3.1-alpine 

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5555

CMD ["npm", "run", "serve"]