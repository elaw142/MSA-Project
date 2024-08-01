# Step 1: Build the react application
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

# Step 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 to the outside once the container has launched
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]