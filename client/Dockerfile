# client/Dockerfile

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

# Build the Next.js app for production
RUN npm run build

EXPOSE 8080

# Set the command to start the Next.js server
CMD ["npm", "start"]