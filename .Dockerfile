FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]