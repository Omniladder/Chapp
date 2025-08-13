
import { z } from 'zod';

const getFriendSchema = z.object({
    receiverID: z.int()
});

export default getFriendSchema;

