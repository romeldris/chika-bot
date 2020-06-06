FROM node:alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "server"]