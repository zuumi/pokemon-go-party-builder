import { Todo } from '@prisma/client'
import prisma from '../../../lib/prisma'

export async function GET(){
  try {
    const todos: Todo[] = await prisma.todo.findMany()
    return Response.json(todos)
  } catch(error) {
    return Response.json(error)
  }
}

export async function POST(request: Request) {
  const { title }: { title: string } = await request.json()

  const response = await prisma.todo.create({
    data: {
      title,
    },
  })
  return Response.json(response)
}
