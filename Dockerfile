FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN mkdir -p dist

RUN tsc

EXPOSE 3000

CMD ["node", "dist/index.js"]