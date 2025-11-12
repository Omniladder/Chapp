"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const removeFriendSchema = zod_1.z.object({
    friendID: zod_1.z.int()
});
exports.default = removeFriendSchema;
