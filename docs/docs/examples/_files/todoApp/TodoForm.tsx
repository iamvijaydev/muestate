export const TodoForm = `
import { useRef, useState } from 'react'
import { useTodoStore } from './store'
import { IconBtn } from './IconBtn'
import { X, SendHorizontal } from 'lucide-react'
import { common, app, inputGrp } from './styles'

export const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [todo, setTodo] = useState('')

  const store = useTodoStore()

  const addTodo = () => {
    if (!todo.trim()) return

    store.addTodo(todo)
    setTodo('')
    ref.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    } else if (e.key === 'Escape') {
      setTodo('')
    }
  }

  return (
    <div className={common.card}>
      <div className={app.form}>
        <div className={app.row}>
          <div className={inputGrp.box}>
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={onKeyDown}
              type="text"
              placeholder="What needs to be done?"
              className={inputGrp.inputFull}
              ref={ref}
            />
          </div>
          <IconBtn
            onClick={addTodo}
            title="Add todo"
            className={common.btn}
            icon={<SendHorizontal />}
          />
        </div>
      </div>
    </div>
  );
}
`