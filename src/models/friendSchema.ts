import { DataTypes, Model } from "sequelize";
import sequelize from "../dbFiles/db";
import { User } from "./userSchema";


export class Friend extends Model{
    public friendID1!: number;
    public friendID2!: number;
    public score!: number;
    public lastChat!: Date;
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
    }
    
}
,{
    sequelize,
    modelName: 'Friend',
    tableName: 'friends',
    timestamps: false,
    indexes: [{unique: true, fields: ['friendID1', 'friendID2']}],
});

console.log("Activated Friend Schema");


