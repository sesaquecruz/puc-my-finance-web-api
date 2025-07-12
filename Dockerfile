FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20 AS prod

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/src/main.js"]
