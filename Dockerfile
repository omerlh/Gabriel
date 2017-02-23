FROM node:7.6
LABEL maintainer "omerlh@gmail.com"
RUN npm install -g yarn

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install

ENV PORT 3030

EXPOSE 3030

CMD ["npm", "start"]
