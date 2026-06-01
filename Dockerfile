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
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
# Copy the built files from the 'build' stage to Nginx's public folder
# Note: Replace 'your-app-name' with your actual project name found in angular.json
# COPY --from=build /app/dist/web-app/server .
COPY --from=build /app/dist/web-app ./
# COPY --from=build /app/dist/web-app/browser ./dist/web-app/browser

EXPOSE 4000
CMD ["node", "server/server.mjs"]
