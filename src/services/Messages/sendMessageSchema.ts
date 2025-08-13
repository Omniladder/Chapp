
import { z } from 'zod';

const addFriendSchema = z.object({
    receiverID: z.int(),
    message: z.string()
});

export default addFriendSchema;

