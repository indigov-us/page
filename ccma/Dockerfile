FROM node:9

RUN npm i -g yarn
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .

CMD ["yarn", "start"]

EXPOSE 3000
