export const TodoCategories = `
import { actionChip } from './styles'
import { useTodoStore, useTodoState } from './store'
import { TodoState } from './state'

export const TodoCategories = () => {
  const store = useTodoStore()

  const selectedCategory = useTodoState<string>(
    (state: TodoState) => state.selectedCategory
  )
  const categoryList = useTodoState<string[]>(
    (state: TodoState) => {
      const hasArchived = Array.from(state.todoList.values()).some(todo => todo.isArchived)
      const list = Array.from(state.categoryList)

      if (hasArchived) {
        list.unshift('Archived')
      }

      return list;
    }
  )

  return (
    <div className={actionChip.box}>
    {
      categoryList.map((category) => (
        <button
          key={category}
          onClick={() => { store.setSelectedCategory(category) }}
          className={selectedCategory === category ? actionChip.btnActive : actionChip.btn}
        >{category}</button>
     ))
    }
    </div>
  )
}
`;