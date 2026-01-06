FROM node:20-alpine

WORKDIR /app

RUN npm set registry https://registry.npmjs.org/
RUN npm set fetch-retry-maxtimeout 120000

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
