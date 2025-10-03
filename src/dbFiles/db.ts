import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ path: '.env' });

const sequelize = new Sequelize(
    process.env.POSTGRES_DB || '',
    process.env.POSTGRES_USER || '', 
    process.env.POSTGRES_PASSWORD || '', {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: console.log,
});

export default sequelize;


