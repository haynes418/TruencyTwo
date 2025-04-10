# Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the application code
COPY . .

# Create the uploads folder
RUN mkdir -p uploads

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]