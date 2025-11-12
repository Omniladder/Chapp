"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbFiles/db"));
class User extends sequelize_1.Model {
}
exports.User = User;
console.log("Before Init");
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    googleID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    githubID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fname: {
        type: sequelize_1.DataTypes.STRING,
    },
    lname: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: db_1.default,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});
console.log("Activated User Schema");
