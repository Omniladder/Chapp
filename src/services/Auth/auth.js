"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const { compareSync, genSaltSync, hashSync } = bcrypt_1.default;
// Request Validation Schemas
const signupSchema_1 = __importDefault(require("./signupSchema"));
const loginSchema_1 = __importDefault(require("./loginSchema"));
// DB ORM Object
const userSchema_1 = require("../../models/userSchema");
function hashPassword(password) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    console.log("Hashed new Passsword");
    return hash;
}
/**
    * User Adding Functionality
*/
function addUser(req) {
    return __awaiter(this, void 0, void 0, function* () {
        //Simple Schema Validation
        const schemaTest = signupSchema_1.default.safeParse(req.body);
        if (!schemaTest.success) {
            console.error("Failed Schema Parsing \n");
            console.error(schemaTest.error);
            return { success: false, message: "Invalid Input. Make sure username & Password are at least 5 characters", error: schemaTest.error, code: 1001 };
        }
        console.log("Successfully Parsed Incoming Request");
        const userData = schemaTest.data;
        //Check if User already in Database
        const dupUser = yield userSchema_1.User.findOne({ where: { "username": userData.username } });
        if (dupUser) {
            console.log("Username Already In Use");
            return { success: false, message: "Username Already In Use. Please try different Username.", code: 1002 };
        }
        // Password Hashing
        const hash = hashPassword(userData.password);
        console.log("New Hash: ", hash);
        if (compareSync(userData.password, hash)) {
            console.log("Passwords Line up");
        }
        else {
            console.error("Hashing Failed Hash & Password Dont align");
            return { success: false, message: "Hashing Failed. Please Retry.", code: 1003 };
        }
        //Save User Data
        yield userSchema_1.User.create({
            "fname": userData.fname,
            "lname": userData.lname,
            "username": userData.username,
            "password": hash,
            "email": userData.email
        });
        console.log("Added New User to Database");
        console.log("\n\n\n");
        return { success: true, message: "Successfully Added Account", code: 1000 };
    });
}
function login(req) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Received a Request");
        const schemaTest = loginSchema_1.default.safeParse(req.body);
        if (!schemaTest.success) {
            return { success: false, message: "Parsing Failed Please Retry", code: 1003 };
        }
        const userData = schemaTest.data;
        const queriedUser = yield userSchema_1.User.findOne({ where: { "username": userData.username } });
        if (!queriedUser) {
            return { success: false, message: "Invalid Username", code: 1001 };
        }
        if (compareSync(userData.password, queriedUser.password)) {
            req.session.userID = queriedUser.id;
            return { success: true, message: "Logged In :)", code: 1000 };
        }
        else {
            return { success: false, message: "Invalid Password", code: 1002 };
        }
    });
}
