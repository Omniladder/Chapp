import { z } from 'zod';

const querySchema = z.object({
    searchTerm: z.string().optional(),
    numberOfPeople: z.int(),
    hasSearchTerm: z.boolean()
});

export default querySchema;

