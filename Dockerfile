# Stage 1: Build the SvelteKit application
FROM node:24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build the SvelteKit application for production.
RUN npm ci --omit dev

# Stage 2: Create the final, production-ready image
FROM node:24-alpine AS runner

# Set the working directory for the final image
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Expose the port the SvelteKit app will listen on.
EXPOSE 3000

# Set the command to run the application
CMD ["node", "./build/index.js"]