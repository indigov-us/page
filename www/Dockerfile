FROM node:9

ARG NODE_ENV
ARG SKIP_BUILD

WORKDIR /usr/src/app

RUN apt-get update && \
  apt-get install git vim -y

RUN npm i -g yarn
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .

RUN if [ -z "$SKIP_BUILD" ]; then yarn run build && rm -rf node_modules && yarn install --production --pure-lockfile; fi

EXPOSE 3000

CMD yarn start
