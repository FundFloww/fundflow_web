# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

RUN npm install -g @angular/cli


# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

EXPOSE 4200

# Build the Angular app
CMD ["ng", "serve", "--host", "0.0.0.0"]
