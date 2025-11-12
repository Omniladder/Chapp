"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../dbFiles/db"));
class Conversation extends sequelize_1.Model {
}
exports.Conversation = Conversation;
console.log("Before Init");
Conversation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    senderID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    receiverID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'Conversation',
    tableName: 'conversation',
    timestamps: true,
    indexes: [
        { fields: ['senderID', 'receiverID', 'message', 'createdAt'] }
    ]
});
console.log("Activated Conversation Schema");
