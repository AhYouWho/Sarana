# Build Angular app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Increase memory limit to 2GB
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build --prod

# Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/project-sarona /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
