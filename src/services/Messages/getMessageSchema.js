"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const getFriendSchema = zod_1.z.object({
    receiverID: zod_1.z.int()
});
exports.default = getFriendSchema;
