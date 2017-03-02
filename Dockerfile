FROM node:7.7
LABEL maintainer "omerlh@gmail.com"
LABEL license MIT

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install

ENV PORT 3030

EXPOSE 3030

CMD ["npm", "start"]
