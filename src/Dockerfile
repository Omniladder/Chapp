FROM node:24

WORKDIR /app

#Copy and Cache Used Packages
COPY package*.json ./

RUN npm install


# Copy Source Code
COPY . .

# Creates Environmental Variable
ENV PORT=8080

# Opens Port 8080
EXPOSE 8080


# Runs Program
CMD [ "npm", "start" ]
