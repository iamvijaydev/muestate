export const TodoList = `
import { useRef, useState } from 'react'
import { Trash } from 'lucide-react'
import { useTodoStore, useTodoState } from './store'
import { IconBtn } from './IconBtn'
import { common, todoItems } from './styles'

export const TodoList = () => {
  const store = useTodoStore()

  const todoList = useTodoState<Todo[]>(
    (state: TodoState) => {
      return Array.from(state.todoList.values())
        .sort((a, b) => {
          if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
          }
          return b.createdAt - a.createdAt;
        });
    }
  )

  if (todoList.length === 0) {
    return (
      <div className={common.card}>
        <p className={todoItems.emptyContent}>Add a new todo</p>
      </div>
    )
  }

  return (
    <div className={common.card}>
      <div className={todoItems.content}>
        {
          todoList.map((todo) => (
            <div className={todoItems.grid} key={todo.title}>
              <input
                id={todo.id}
                checked={todo.isCompleted}
                onChange={() => store.toggleTodo(todo.id)}
                type='checkbox'
              />
              <label
                htmlFor={todo.id}
                className={todo.isCompleted ? 'line-through' : ''}
              >
                {todo.title}
              </label>
              <IconBtn
                onClick={() => store.removeTodo(todo.id)}
                title="Remove todo"
                className={common.btnIcon}
                icon={<Trash size={20} strokeWidth={2} />}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}
`