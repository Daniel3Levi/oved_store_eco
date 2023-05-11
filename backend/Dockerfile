FROM node

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . . 

EXPOSE 5005

CMD ["npm","start"]