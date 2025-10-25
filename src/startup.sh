source .env

npx ts-node dbFiles/sync.ts
npx sequelize-cli migration:generate --name enable-pg-trgm
npx sequelize-cli db:migrate

npm run start

