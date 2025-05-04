FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run db:generate

EXPOSE 3004

CMD ["npm", "run", "dev"]