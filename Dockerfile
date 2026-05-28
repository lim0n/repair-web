# Stage 1: Build the Angular application
FROM node:22-alpine AS build
WORKDIR /app

# Copy configuration files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
# Copy the built files from the 'build' stage to Nginx's public folder
# Note: Replace 'your-app-name' with your actual project name found in angular.json
COPY --from=build /app/dist/web-app /usr/share/nginx/html

# Expose port 80 and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
