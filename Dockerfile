# develop stage
FROM node:12-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY . .
# build stage
FROM develop-stage as build-stage
RUN quasar build
# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /app/dist/pwa /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
