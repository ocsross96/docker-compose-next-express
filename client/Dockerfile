# Use the official Node.js LTS (Long Term Support) image as the build image (slim version)
FROM node:lts-slim AS BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json file to the working directory
COPY package*.json .

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app for production
RUN npm run build

# Start a new build phase
FROM node:lts-slim AS FINAL_IMAGE
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy only the built output we need to the working directory
COPY --from=BUILD_IMAGE /app/package.json .
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

# Remove packages that are not required for production
RUN npm prune --omit=dev

# Set the command to start the Next.js server
CMD ["npm", "start"]