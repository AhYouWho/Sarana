FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /app/dist/your-angular-project /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
