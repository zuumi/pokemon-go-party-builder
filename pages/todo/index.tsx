'use client';
// まずは写経から
import { useEffect, useState } from "react";
import "../../app/globals.css";

type Todo = {
  id: number
  title: string
  completed: boolean
}

export default function Home() {
  const [ inputValue, setInputValue ] = useState<string | null>(null)
  const [ todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const getTodo = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo`)
      const todos = await response.json()
      setTodos(todos)
    }
    getTodo()
  }, [])

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Todo</h1>
        {todos.map((todo) => (
          <div className="flex items-center justify-between bg-gray-200 p-2 rounded mb-2" key={todo.id}>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" checked={todo.completed} onChange={()=> console.log('completedを更新する処理')}/>
              <p className={`text-black ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </p>
            </div>
            <button
              onClick={() => console.log('削除する処理')}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
            >
              削除
            </button>
          </div>
        ))}
        <form
          onSubmit={
            async (e) => {
              e.preventDefault()
              if (!inputValue) alert('入力してください')
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/todo`,
                {
                  method: 'POST',
                  headers: {
                    'Const-Type': 'application/json',
                  },
                  body: JSON.stringify({ title: inputValue }),
                }
              )
              const newTodo = await response.json()

              setTodos([...todos, newTodo])
              setInputValue(null)
            }
          }
          className='flex items-center mt-4'
        >
          <input
            type='text'
            className='border border-gray-400 px-4 py-2 mr-2 rounded text-black'
            value={inputValue || ''}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Todoを入力してください'
          />
          <button
            type='submit'
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
          >
            追加
          </button>
        </form>
      </div>
    </>
  )
}