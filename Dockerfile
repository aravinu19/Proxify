FROM node:alpine

WORKDIR /usr/local/proxify
COPY . /usr/local/proxify

RUN npm install
CMD npm start

EXPOSE 80 8080