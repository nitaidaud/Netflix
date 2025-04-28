FROM node:18

# Install build dependencies for bcrypt
RUN apt-get update && apt-get install -y build-essential python3

WORKDIR /app

# Copy only package files first to take advantage of Docker layer caching
COPY package.json ./

# install new dependencies if any
RUN npm install

# Then copy the rest of your code
COPY . .

RUN npm run db:generate

# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt

EXPOSE 3000

CMD ["npm", "run", "dev"]
