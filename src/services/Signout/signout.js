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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = deleteAccount;
exports.logout = logout;
const userSchema_1 = require("../../models/userSchema");
function deleteAccount(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const userID = req.session.userID;
        if (!userID) {
            console.error("Failed to Find User ID");
            console.error(req.body);
            return { success: false, message: "Failed to find ID Please Retry.", code: 1001 };
        }
        // Delete Account from Database 
        // TODO: Make sure all data relating to user is deleted ie. friends etc
        try {
            yield userSchema_1.User.destroy({ where: { id: userID } });
            console.log("Deleted User. ID=", userID);
        }
        catch (err) {
            console.error("Failed to Delete account Error: ", err);
            return { success: false, message: "Account Deletion Failed, Please Try Again Later.", code: 1002 };
        }
        //Logout the user session
        let logoutResponse = yield logout(req);
        if (logoutResponse.success) {
            return { success: true, message: "Successfully Added Account", code: 1000 };
        }
        else {
            return { success: false, message: "Logout Failed", code: 1003 };
        }
    });
}
function logout(req) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            req.session.destroy(err => {
                if (err) {
                    console.error("Failed to Logout User");
                    resolve({ success: false, message: "Failed to Logout User", code: 1001 });
                }
                else {
                    console.log("Logged out User");
                    resolve({ success: true, message: "Logged Out User", code: 1000 });
                }
            });
        });
    });
}
