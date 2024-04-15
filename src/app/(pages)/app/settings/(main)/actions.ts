'use server'

import * as zod from 'zod'
import { updateProfileSchema } from './schema'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function updateProfile(
  input: zod.infer<typeof updateProfileSchema>,
) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: input.name,
    },
  })
}
