# Use the official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port the app will run on
EXPOSE 3001

# Define the command to run your app
CMD ["node", "microserviceB.js"]
