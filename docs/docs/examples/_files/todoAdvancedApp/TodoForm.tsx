export const TodoForm = `
import { useRef, useState } from 'react'
import { TodoState } from './state'
import { useTodoStore, useTodoState } from './store'
import { IconBtn } from './IconBtn'
import { X, BookmarkPlus, SendHorizontal } from 'lucide-react'
import { common, app, inputGrp } from './styles'

export const TodoForm = () => {
  const ref = useRef<HTMLInputElement>(null)
  const [todo, setTodo] = useState('')
  const [category, setCategory] = useState('All')

  const store = useTodoStore()

  const categoryList = useTodoState<string[]>(
    (state: TodoState) => {
      return Array.from(state.categoryList);
    },
    (prev: string[], next: string[]) => {
      return prev.length !== next.length;
    }
  )

  const showAddCategory = category.length && categoryList.every(
    (cat) => cat.toLowerCase()
      .indexOf(category.toLowerCase()) === -1
  )
  const showRemoveCategory = categoryList.some((cat) => cat === category)

  const addTodo = () => {
    if (!todo.trim()) return

    store.addTodo(todo, category)
    setTodo('')
    setCategory('All')
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
          <div className={inputGrp.box}>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              list="category-list"
              id="category"
              placeholder="Category"
              className={showAddCategory || showRemoveCategory ?  inputGrp.input : inputGrp.inputFull}
            />
            {showAddCategory ? (<IconBtn
              onClick={() => { store.addCategory(category) }}
              title="Add category"
              className={inputGrp.btnPost}
              icon={<BookmarkPlus />}
            />) : null}
            {showRemoveCategory ? (<IconBtn
              onClick={() => { setCategory('') }}
              title="Remove category"
              className={inputGrp.btnPost}
              icon={<X />}
            />) : null}
            <datalist id="category-list">
              {categoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </datalist>
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