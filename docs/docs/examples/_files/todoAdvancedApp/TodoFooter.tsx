export const TodoFooter = `
import { useTodoStore, useTodoState } from './store'
import { ActionBtn } from './ActionBtn'
import { common, todoItems } from './styles'

export const TodoFooter = () => {
  const store = useTodoStore()

  const [total, completed, archived] = useTodoState<Todo[]>(
    (state: TodoState) => {
      let completed = 0;
      let archived = 0;

      state.currentTodos.forEach(todo => {
        if (todo.isCompleted) {
          completed++
        }
        if (todo.isArchived) {
          archived++
        }
      })

      return [state.currentTodos.length, completed, archived];
    }
  )

  const category = useTodoState<string>(
    (state: TodoState) => state.selectedCategory
  )

  if (total === 0) {
    return null
  }

  if (completed === 0 || category === 'Archived') {
    return (
      <div className={common.card}>
        <div className={todoItems.contentFooter}>
          <div className={todoItems.count}>
            <span>{total + ' item(s) in '}</span><strong>{category}</strong>
          </div>
          {category === 'Archived' ? (
            <button
              onClick={store.removeArchived}
              type="button"
              className={common.btn}
            >Remove archived</button>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className={common.card}>
      <div className={todoItems.contentFooter}>
        <div className={todoItems.count}>
          <span>{completed + '/' + total + ' completed in '}</span> <strong>{category}</strong>
        </div>
        {completed !== archived && completed > 0 ? (
          <button
            onClick={store.archiveCompleted}
            type="button"
            className={common.btn}
          >Archive completed</button>
        ) : null}
      </div>
    </div>
  )
}
`