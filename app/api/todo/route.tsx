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
