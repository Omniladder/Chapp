import { z } from 'zod';

const signupSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export default signupSchema;

