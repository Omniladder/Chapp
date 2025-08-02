import { z } from 'zod';

const signupSchema = z.object({
    fname: z.string().min(1,"Must Input First Name"),
    lname: z.string().min(1, "Must Input Last Name"),
    username: z.string().min(5, "Must have at least 5 input long username"),
    password: z.string().min(5, "Must have 5 character long password"),
    email: z.email()
});

export default signupSchema;

