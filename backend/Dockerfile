FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV DATABASE_URL="postgresql://postgres:00aa1122@postgres:5432/test"
RUN npx prisma generate

EXPOSE 3001
CMD ["npm","run","start:dev"]