FROM node:16.17-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY server.js ./
COPY build/Release/licenseGenerator.node ./build/Release/licenseGenerator.node

CMD ["node", "server.js"]
