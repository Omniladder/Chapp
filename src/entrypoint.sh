#!/bin/sh

echo "Running database migrations..."
npx sequelize-cli db:migrate

echo "Starting Lambda handler..."
/app/serverless.handler
