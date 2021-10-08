FROM node:alpine 
WORKDIR /app 
COPY ./app/package.json /app/package.json 
COPY ./app/yarn.lock /app/yarn.lock 
COPY ./app /app
RUN yarn install
CMD ["yarn", "start"]