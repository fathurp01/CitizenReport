# Stage 1: Build React App
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# We set REACT_APP_API_URL to blank in production so it queries relative paths
# which will be seamlessly intercepted and proxied by Nginx
ENV REACT_APP_API_URL=""
RUN npm run build

# Stage 2: Serve React App with Nginx (supporting environment variables in conf)
FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
