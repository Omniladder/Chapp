"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = exports.Friend = exports.User = void 0;
const userSchema_1 = require("./userSchema");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return userSchema_1.User; } });
const friendSchema_1 = require("./friendSchema");
Object.defineProperty(exports, "Friend", { enumerable: true, get: function () { return friendSchema_1.Friend; } });
const conversationSchema_1 = require("./conversationSchema");
Object.defineProperty(exports, "Conversation", { enumerable: true, get: function () { return conversationSchema_1.Conversation; } });
friendSchema_1.Friend.belongsTo(userSchema_1.User, { as: 'user1', foreignKey: 'friendID1' });
friendSchema_1.Friend.belongsTo(userSchema_1.User, { as: 'user2', foreignKey: 'friendID2' });
userSchema_1.User.belongsToMany(userSchema_1.User, {
    through: friendSchema_1.Friend,
    as: 'friends',
    foreignKey: 'friendID1',
    otherKey: 'friendID2'
});
console.log("Connected Friends and Users");
