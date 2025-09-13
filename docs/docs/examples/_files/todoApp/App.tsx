export const App = `
import { TodoProvider } from './store'
import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { TodoFooter } from './TodoFooter'
import { common } from './styles'

export const App = () => {
  return (
    <div className={common.pot}>
      <div className={common.potRows}>
        <TodoProvider>
          <TodoForm />
          <TodoList />
          <TodoFooter />
        </TodoProvider>
      </div>
    </div>
  )
}
`