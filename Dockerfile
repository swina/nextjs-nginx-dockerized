FROM node:alpine

RUN npm install -g npm@8.5.5
RUN mkdir /app && chown node:node /app
RUN npm install -g nodemon

USER node

WORKDIR /app
COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]