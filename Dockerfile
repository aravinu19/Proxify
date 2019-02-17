FROM ubuntu:bionic

WORKDIR /usr/local/proxify
COPY . /usr/local/proxify

RUN apt update && apt install npm wget -y
RUN npm i -g n
RUN n latest

RUN npm install
RUN npm start

EXPOSE 80 8080