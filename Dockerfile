FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon  # 💡 Ensures Nodemon is available

COPY . .

EXPOSE 3000
CMD npm run dev
