import { z } from 'zod';

const GoogleSchema = z.object({
    from: z.string().optional()
});

export default GoogleSchema;

