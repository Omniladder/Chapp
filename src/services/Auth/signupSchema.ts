import { z } from 'zod';

const signupSchema = z.object({
    fname: z.string(),
    lname: z.string(),
    username: z.string(),
    password: z.string(),
    email: z.email()
});

export default signupSchema;

