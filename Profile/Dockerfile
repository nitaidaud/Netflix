FROM node:18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run db:generate

EXPOSE 3002

CMD ["npm", "run", "dev"]