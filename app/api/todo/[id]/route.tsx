import prisma from '../../../../lib/prisma'
import { NextRequest } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string }}
) {
  const id = Number(params.id)
  const { completed }: { completed: boolean } = await request.json()
  const response = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    },
  })
  return Response.json(response)
}
