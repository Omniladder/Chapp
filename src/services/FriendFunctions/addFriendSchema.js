"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const addFriendSchema = zod_1.z.object({
    friendID: zod_1.z.number()
});
exports.default = addFriendSchema;
