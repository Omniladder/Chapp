"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const addFriendSchema = zod_1.z.object({
    receiverID: zod_1.z.int(),
    message: zod_1.z.string()
});
exports.default = addFriendSchema;
