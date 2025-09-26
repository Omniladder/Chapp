import { z } from 'zod';

const GoogleTokenSchema = z.object({
    code: z.string(),
    state: z.string().optional()
})

export default GoogleTokenSchema;
