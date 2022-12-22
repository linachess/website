FROM node:16.17-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]