FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of your application source code
COPY . .

# Build the application (adjust if your build output folder is different)
RUN npm run build --if-present

# Debug step: list files to verify the build output directory
RUN ls -la /app

# Install Nginx in the same container
RUN apk update && apk add nginx

# Remove the default Nginx website content
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to Nginx's public folder
# Update '/app/build' if your build output is in a different directory (e.g., '/app/dist')
RUN cp -R /app/build /usr/share/nginx/html

# Expose port 80 to serve the application
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
