# Stage 1: Build the Angular application
FROM node:alpine AS build
WORKDIR /app

# Copy configuration files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build it
COPY . .
RUN npm run build --configuration=production



# Stage 2: Serve the application using Nginx
FROM node:alpine
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

# ENV PORT=4000
# ENV HOST=0.0.0.0

CMD ["node", "server/server.mjs"]



# # =========================================
# # Stage 2: Prepare Nginx to Serve Static Files
# # =========================================

# FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS runner

# # Copy custom Nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

# # Copy the static build output from the build stage to Nginx's default HTML serving directory
# COPY --chown=nginx:nginx --from=builder /app/dist/web-app/browser /usr/share/nginx/html

# # Use a non-root user for security best practices
# USER nginx

# # Expose port 8080 to allow HTTP traffic
# # Note: The default Nginx container now listens on port 8080 instead of 80 
# EXPOSE 8080

# # Start Nginx directly with custom config
# ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
# CMD ["-g", "daemon off;"]
