# 1. Build stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# 2. Production stage with nginx
FROM nginx:alpine

# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Remove default nginx config (optional)
RUN rm /etc/nginx/conf.d/default.conf

# Add custom nginx config
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
