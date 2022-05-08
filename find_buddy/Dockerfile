FROM node:latest

RUN mkdir -p /client

WORKDIR /client

COPY . .
RUN npm i
CMD ["npm","start"]
EXPOSE 3000