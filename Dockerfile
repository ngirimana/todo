# Define the image we will use and version
# latest just means we need the latest nodejs image available
FROM node:15.9.0

# Create an app directory to hold the application code
WORKDIR /user/src/

# Duplicate the dependency file to the container's project root directory.
COPY package.json .
COPY package-lock.json .

# Install app dependencies
RUN npm install

# Bundle app source inside the docker image
COPY . .

# Expose our app port inside the app and 
EXPOSE 3000

# Define commands that will run the app
CMD ["npm", "run", "dev-start"]