"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    fname: zod_1.z.string().min(1, "Must Input First Name"),
    lname: zod_1.z.string().min(1, "Must Input Last Name"),
    username: zod_1.z.string().min(5, "Must have at least 5 input long username"),
    password: zod_1.z.string().min(5, "Must have 5 character long password"),
    email: zod_1.z.email()
});
exports.default = signupSchema;
