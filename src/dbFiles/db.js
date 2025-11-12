"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '.env' });
const sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DB || '', process.env.POSTGRES_USER || '', process.env.POSTGRES_PASSWORD || '', {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },
    },
    logging: console.log,
});
exports.default = sequelize;
