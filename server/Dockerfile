# server/Dockerfile

# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json file to the working directory
COPY ./package.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./ ./

# Compile the application using typescript
RUN npm run build

# Copy the built output to the working directory
COPY ./dist ./

EXPOSE 3000

# Set the command to start the Express server
CMD ["npm", "start"]