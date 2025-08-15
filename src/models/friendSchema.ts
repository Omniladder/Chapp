import { DataTypes, Model } from "sequelize";
import sequelize from "../dbFiles/db";
import { User } from "./userSchema";


export class Friend extends Model{
    public friendID1!: number;
    public friendID2!: number;
    public score!: number;
    public missedMessages!: number;
    public streak!: number;
    public unlockStreakDate!: Date;
    public endStreakDate!: Date;
    public isFoF!: boolean;
    public isRival!: boolean;
    public isTop!: boolean;
    public isBest!: boolean;
    public isMutualBest!: boolean;
}

console.log("Before Init");
Friend.init({
    friendID1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    friendID2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },    
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    missedMessages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    streak: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    unlockStreakDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date('1900-01-01')
    },
    endStreakDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date('1900-01-01')
    },
    isFoF: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isRival: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isTop: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isBest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isMutualBest: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}
,{
    sequelize,
    modelName: 'Friend',
    tableName: 'friends',
    timestamps: false,
    indexes: [{unique: true, fields: ['friendID1', 'friendID2', 'missedMessages']}],
});

console.log("Activated Friend Schema");


