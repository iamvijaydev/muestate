export const TodoFooter = `
import { Trash } from 'lucide-react'
import { useTodoStore, useTodoState } from './store'
import { ActionBtn } from './ActionBtn'
import { common, todoItems } from './styles'

export const TodoFooter = () => {
  const store = useTodoStore()

  const [total, completed] = useTodoState<Todo[]>(
    (state: TodoState) => {
      const todos = Array.from(state.values());

      return [
        todos.length,
        todos.filter(todo => todo.isCompleted)
          .length
      ]
    }
  )

  if (total === 0) {
    return null
  }

  if (completed === 0) {
    return (
      <div className={common.card}>
        <div className={todoItems.contentFooter}>
          <div className={todoItems.count}>{total + ' todos in total'}</div>
        </div>
      </div>
    )
  }

  const label = completed + '/' + total + ' completed'

  return (
    <div className={common.card}>
      <div className={todoItems.contentFooter}>
        <div className={todoItems.count}>{label}</div>
        <button
          onClick={store.removeCompleted}
          type="button"
          className={common.btn}
        >Remove completed</button>
      </div>
    </div>
  )
}
`