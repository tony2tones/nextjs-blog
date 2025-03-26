FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon  # 💡 Ensures Nodemon is available
RUN npm install -g prisma

COPY . .

EXPOSE 3000
CMD npm run dev
