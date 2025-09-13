export const App = `
import { TodoProvider } from './store'
import { TodoForm } from './TodoForm'
import { TodoCategories } from './TodoCategories'
import { TodoList } from './TodoList'
import { TodoFooter } from './TodoFooter'
import { common } from './styles'

export const App = () => {
  return (
    <div className={common.potTop}>
      <div className={common.potRows}>
        <TodoProvider>
          <TodoForm />
          <TodoCategories />
          <TodoList />
          <TodoFooter />
        </TodoProvider>
      </div>
    </div>
  )
}
`