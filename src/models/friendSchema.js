"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbFiles/db"));
class Friend extends sequelize_1.Model {
}
exports.Friend = Friend;
console.log("Before Init");
Friend.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    friendID1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    friendID2: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    missedMessages: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    streak: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    unlockStreakDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date('1900-01-01')
    },
    endStreakDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date('1900-01-01')
    },
    isFoF: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isRival: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isTop: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isBest: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isMutualBest: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: db_1.default,
    modelName: 'Friend',
    tableName: 'friends',
    timestamps: false,
});
console.log("Activated Friend Schema");
