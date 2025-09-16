FROM node:24 AS backend-server

WORKDIR /app

#Copy and Cache Used Packages
COPY package*.json ./

RUN npm install


# Copy Source Code
COPY . .

# Creates Environmental Variable
ENV PORT=8080

# Take Args for buildings
ENV POSTGRES_HOST=db



# Runs Program
CMD [ "./startup.sh"]

