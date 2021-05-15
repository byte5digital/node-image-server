FROM node:14
RUN npm install pm2 -g

WORKDIR /app

COPY package.json package.json

RUN npm i

COPY . .

RUN npm run build

EXPOSE 3333

CMD ["pm2-runtime", "dist/index.js", "-i", "max"]