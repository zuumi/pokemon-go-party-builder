import prisma from '../../../../lib/prisma';

export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title },
    });
    res.json(newTodo);
  } else if (req.method === 'PUT') {
    const { id, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    res.json(updatedTodo);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await prisma.todo.delete({
      where: { id },
    });
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
