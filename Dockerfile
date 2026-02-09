FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

RUN ./node_modules/.bin/prisma generate

EXPOSE 3000
CMD npm run dev
