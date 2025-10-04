import { z } from 'zod';

const removeFriendSchema = z.object({
    friendID: z.int()
});

export default removeFriendSchema;

