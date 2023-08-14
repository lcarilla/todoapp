FROM node:18-alpine as build
WORKDIR /build
COPY . .
RUN npm i
RUN npm run build
FROM nginx:alpine
COPY --from=build /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]