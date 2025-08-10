import { z } from 'zod';

const addFriendSchema = z.object({
    friendID: z.number()
});

export default addFriendSchema;

