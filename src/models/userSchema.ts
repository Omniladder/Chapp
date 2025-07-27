import { DataTypes, Model } from "sequelize";
import sequelize from "../dbFiles/db";


export class User extends Model{
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public fname!: string;
    public lname!: string;
}

console.log("Before Init");
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fname: {
        type: DataTypes.STRING,
    },
    lname: {
        type: DataTypes.STRING,
    },
}
,{
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

console.log("Activated User Schema");

