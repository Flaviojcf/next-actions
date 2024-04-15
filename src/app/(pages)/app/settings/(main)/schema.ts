import * as zod from 'zod'

export const updateProfileSchema = zod.object({
  name: zod.string(),
  email: zod.string().email({ message: 'Email is required' }),
})
