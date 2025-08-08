# Build Angular app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/project-sarona /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
