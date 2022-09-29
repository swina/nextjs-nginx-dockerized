FROM node:16
WORKDIR /api
COPY package.json package-lock.json ./
#RUN npm install -g nodemon
RUN npm install -g pm2
COPY ./ ./
RUN npm install
EXPOSE 9100
CMD [ "pm2-runtime", "start", "--name=ferrari-api" , "npm", "--", "start" ]
#CMD [ "npm" , "run" , "start"]