# source: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Install dependencies only when needed
FROM node:16-alpine as deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm ci

CMD ["npm", "run", "dev"]
