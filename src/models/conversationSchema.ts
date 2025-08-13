import { DataTypes, Model } from "sequelize";
import sequelize from "../dbFiles/db";


export class Conversation extends Model{
    public message!: string;
    public senderID!: number;
    public receiverID!: number;
}

console.log("Before Init");
Conversation.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    senderID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    receiverID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },    
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}
,{
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversation',
    timestamps: true,
    indexes: [
        { fields: ['senderID', 'receiverID', 'message', 'createdAt'] }
    ]
});

console.log("Activated Conversation Schema");


