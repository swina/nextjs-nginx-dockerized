FROM node:16

WORKDIR /api
RUN npm install -g pm2

COPY package.json package-lock.json ./
COPY ./ ./

RUN npm install

EXPOSE 9100

CMD [ "pm2-runtime", "start", "--name=ferrari-api" , "npm", "--", "start" ]
#CMD [ "npm" , "run" , "start"]