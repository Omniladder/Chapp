import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });

const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '', 
    process.env.DB_PASS || '', {
    host: process.env.DB_HOST || '',
    dialect: 'postgres',
});

export default sequelize;

