FROM public.ecr.aws/lambda/nodejs:20 AS backend-server

WORKDIR /app

#Copy and Cache Used Packages
COPY package*.json ./

RUN npm install


# Copy Source Code
COPY . .

# Creates Environmental Variable
ENV PORT=3000

# Take Args for buildings
ENV POSTGRES_HOST=db

RUN npx tsc


# Runs Program
CMD ["/app/serverless.handler"]

