import { Sandpack } from "@codesandbox/sandpack-react";

export const TodoApp = () => {
  return (
    <div>
      <Sandpack
        theme="auto"
        template="react"
        options={{
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: 800,
          externalResources: [
            "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
          ],
        }}
        customSetup={{
          dependencies: {
            "lucide-react": "latest",
            muestate: "latest",
          },
          entry: "/index.js",
        }}
        files={{
          "/styles.ts": {
            hidden: true,
            code: `export const app = {
  container: 'h-dvh bg-neutral-100 relative'            
}
export const textboxGrp = {
  container: 'grid grid-flow-row',
  label: 'font-mono text-sm text-neutral-700',
  group: 'relative',
  input: 'peer w-full bg-white border-1 border-neutral-300 hover:border-indigo-400 outline-indigo-400 focus:outline-1 rounded-sm p-2 text-sm text-neutral-900 leading-none',
  iconBtn: 'p-2 rounded-r-sm absolute inset-y-0 right-0 cursor-pointer disabled:invisible bg-neutral-300 hover:bg-indigo-400 peer-hover:bg-indigo-400 peer-focus:bg-indigo-400 outline-indigo-400 focus:outline-1 group',
  btnIcon: 'text-white'
}
textboxGrp.iconBtnEnd = textboxGrp.iconBtn + ' ' + textboxGrp.iconBtnEnd

export const todoForm = {
  container: 'mx-auto max-w-2xl grid grid-cols-[1fr_minmax(120px,15%)] gap-4 p-6 bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  grid: 'grid grid-cols-[minmax(110px,15%)_1fr] gap-4',
  addTodo: 'absolute inset-x-0 bottom-0 rounded-sm cursor-pointer disabled:cursor-none disabled:bg-neutral-300 bg-neutral-400/70 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 text-md text-neutral-600 hover:text-white focus:text-white leading-0 flex flex-nowrap items-center p-3 gap-2 transition',
}
  
export const categoryTabs = {
  container: 'mt-6 mx-auto max-w-2xl flex flex-wrap gap-2',
  base: 'px-3 py-1 rounded-full flex items-center gap-2 text-sm font-mono border cursor-pointer transition uppercase',
  default: 'border-neutral-200 bg-neutral-200 hover:bg-indigo-200 hover:border-indigo-300 text-neutral-950 hover:text-indigo-950 hover:shadow-sm',
  active: 'bg-indigo-200 border-indigo-300 text-indigo-600', 
}
  
export const todoItems = {
  emptyContainer: 'mt-6 mx-auto max-w-2xl grid place-item-center p-10 bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  emptyContent: 'text-neutral-500 text-center',
  container: 'mt-6 mx-auto max-w-2xl bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  content: 'grid grid-flow-row auto-rows-max gap-6 p-6',
  contentFooter: 'border-t-1 border-neutral-300 flex items-center justify-between gap-6 px-6 py-3',
  grid: 'grid grid-cols-[20px_1fr_max-content_20px] items-start gap-3',
  category: 'font-mono text-xs uppercase leading-3 bg-indigo-100 text-indigo-400 p-1 rounded',
  actionBtn: 'text-neutral-900 hover:text-indigo-600 cursor-pointer',
  count: 'text-md text-neutral-600',
  bulkActionBtn: 'flex flex-nowrap items-center px-2 py-1 gap-2 rounded-sm cursor-pointer bg-neutral-400/70 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 text-md text-neutral-600 hover:text-white focus:text-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-auto transition',
}`,
          },
          "/index.js": {
            hidden: true,
            code: `import React from 'react';
import ReactDOM from 'react-dom/client';
import CounterApp from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CounterApp />  
  </React.StrictMode>
);`,
          },
          "/store.ts": {
            code: `import { createStore, type SetStateFn } from 'muestate'
import { type TodoState, initialTodoState } from './state'

export type TodoItem = {
  title: string
  isCompleted: boolean
}
// Since the state is mutable, we are not constrained to arrays
export type TodoState = Map<string, TodoItem>

const makeMethods = (setState: SetStateFn<TodoState>) => ({
  addTodo(title: string) {
    setState((todos) => {
      todos.set(uuid(), { title, isCompleted: false })
      return todos;
    })
  },
  toggleCompleted(id: string) {
    setState((todos) => {
      const todo = todos.get(id)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
      return todos
    })
  },
})

const initialTodo: TodoState = new Map([
  ["72b65e9d-c834-4f6d-a505-3065d5c500fa",
    { title: "Learn Muestate", isCompleted: false }],
  ["d44856ff-4736-4039-b695-c8d694aa4420",
    { title: "Build a Todo App", isCompleted: false }],
  ["ffee5d5b-a91e-4fb7-a041-ec94dded1b69",
    { title: "Share with the community", isCompleted: false }],
  ["7497ca34-6ebb-4ab9-aecf-9b0e4af190b0",
    { title: "Engage with users", isCompleted: false }],
  ["55793ab2-2783-472b-b0fa-08dbfdf0d240",
    { title: "Get feedback", isCompleted: false }],
])
    
export const [
  // access the store methods ('addTodo' and 'toggleCompleted')
  useTodoStore,
  // access the state as a reactive value
  useTodoState,
  // provider to share the store via React Context
  TodoProvider,
] = createStore(initialTodo, makeMethods)`,
            active: true,
          },
          "/App.tsx": `import { TodoProvider } from './store'
import { TodoForm } from './TodoForm'
import { CategoryTab } from './CategoryTab'
import { TodoList } from './TodoList'
import { app } from './styles'

export default function TodoApp() {
  return (
    <div className={app.container}>
      <TodoProvider>
        <AddTodoForm />
        <TodoList />
        <TodoStatus />
      </TodoProvider>
    </div>
  )
}`,
          "/TodoForm.tsx": `import { useState } from 'react'
import { X, BookmarkPlus, SendHorizontal } from 'lucide-react'
import { useTodoState, useTodoStore } from './store'
import { type TodoState } from './state'
import { textboxGrp, todoForm } from './styles'

export const TodoForm = () => {
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

  const showAddCategory = category.length && categoryList.every((cat) => cat.toLowerCase().indexOf(category.toLowerCase()) === -1)
  const showRemoveCategory = categoryList.some((cat) => cat === category)

  const addTodo = () => {
    if (!todo.trim()) return

    store.addTodo(todo, category)
    setTodo('')
    setCategory('All')
  }

  return (
    <div className={todoForm.container}>
      <div className={todoForm.grid}>
        <div className={textboxGrp.container}>
          <label htmlFor="category" className={textboxGrp.label}>Category</label>
          <div className={textboxGrp.group}>
            <input
              list="category-list"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={textboxGrp.input}
            />
            {showAddCategory ? (
              <button
                onClick={() => { store.addCategory(category) }}
                type="button"
                title="Add category"
                aria-label="Add category"
                className={textboxGrp.iconBtn}
              >
                <BookmarkPlus size={16} strokeWidth={2} className={todoForm.btnIcon} />
              </button>
            ) : null}
            {showRemoveCategory ? (
              <button
                onClick={() => { setCategory('') }}
                type="button"
                title="Remove category"
                aria-label="Remove category"
                className={textboxGrp.iconBtn}
              >
                <X size={16} strokeWidth={2} className={todoForm.btnIcon} />
              </button>
            ) : null}
            <datalist id="category-list">
              {categoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </datalist>
          </div>
        </div>
        <div className={textboxGrp.container}>
          <label htmlFor="todo" className={textboxGrp.label}>Todo</label>
          <div className={textboxGrp.group}>
            <input
              id="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              placeholder="Add a todo"
              className={textboxGrp.input}
              autocomplete="off"
            />
            <button
              disabled={!Boolean(todo.trim())}
              onClick={(e) => setTodo('')}
              type="button"
              title="Clear"
              aria-label="Clear"
              className={textboxGrp.iconBtn}
            >
              <X size={16} strokeWidth={3} className={textboxGrp.btnIcon} />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={addTodo}
          type="button"
          className={todoForm.addTodo}
          title="Add todo"
          aria-label="Add todo"
        >
          <span>Add Todo</span>
          <SendHorizontal size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}`,
          "/CategoryTab.tsx": `import { Bookmark, BookmarkCheck, Archive } from 'lucide-react'
import { useTodoStore, useTodoState } from './store'
import { type TodoState, type Todo } from './state'
import { categoryTabs } from './styles'

export const CategoryTab = () => {
  const { setSelectedCategory } = useTodoStore()

  const categoryList = useTodoState<string[]>(
    (state: TodoState) => {
      return Array.from(state.categoryList);
    },
    (prev: string[], next: string[]) => {
      return prev.length !== next.length;
    }
  )
  
  const selected = useTodoState<string>(
    (state: TodoState) => state.selectedCategory
  )

  const archivedCount = useTodoState<Todo[]>(
    (state: TodoState) => {
      return Array.from(state.todoList.values())
        .filter(todo => todo.isArchived).length
    }
  )

  const getBtnClass = (category: string) => {
    return categoryTabs.base + ' ' + (selected === category ? categoryTabs.active : categoryTabs.default);
  }

  return (
    <div className={categoryTabs.container}>
      {archivedCount > 0 ? (
        <button
          onClick={() => setSelectedCategory('Archived')}
          type="button"
          className={getBtnClass('Archived')}
        >
          <Archive size={16} strokeWidth={2} />
          <span>Archived</span>
        </button>
      ) : null}
      {
        categoryList.map((category: string) => (
          <button
            onClick={() => setSelectedCategory(category)}
            key={category}
            type="button"
            className={getBtnClass(category)}
          >
            {category === selected ? (
              <BookmarkCheck size={16} strokeWidth={2} />
            ) : (
              <Bookmark size={16} strokeWidth={2} />
            )}
            <span>{category}</span>
          </button>
        ))
      }
    </div>
  )
}`,
          "/TodoList.tsx": `import { Trash, Undo2, ArchiveRestore } from 'lucide-react'
import { useTodoStore, useTodoState } from './store'
import { type TodoState, type Todo } from './state'
import { textBtnCls, todoItems } from './styles'

export const TodoList = () => {
  const store = useTodoStore()

  const todoList = useTodoState<Todo[]>(
    (state: TodoState) => {
      return Array.from(state.todoList.values())
        .filter(todo => {
          if (state.selectedCategory === 'Archived') {
            return todo.isArchived;
          }

          if (state.selectedCategory === 'All') {
            return !todo.isArchived;
          }

          return !todo.isArchived && todo.category === state.selectedCategory
        })
        .sort((a, b) => {
          if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
          }
          return b.createdAt - a.createdAt;
        });
    }
  )

  const selectedCategory = useTodoState<string>(
    (state: TodoState) => state.selectedCategory
  )
  
  if (todoList.length === 0) {
    return (
      <div className={todoItems.emptyContainer}>
        <p className={todoItems.emptyContent}>
          {selectedCategory === 'All'
            ? 'Add a new todo.'
            : 'No todos under "' + selectedCategory + '"'}
        </p>
      </div>
    )
  }
  
  const completedCount = todoList.filter(todo => todo.isCompleted).length
  const archivedCount = todoList.filter(todo => todo.isArchived).length
  const hasCompleted = selectedCategory !== 'Archived' && completedCount > 0
  const hasArchived = selectedCategory === 'Archived' && archivedCount > 0
  const completedLabel = completedCount + '/' + todoList.length + ' completed'

  return (
    <div className={todoItems.container}>
      <div className={todoItems.content}>
      {
        todoList.map((todo) => (
          <div className={todoItems.grid} key={todo.title}>
            <input
              id={todo.id}
              checked={todo.isCompleted}
              onChange={() => store.toggleTodo(todo.id)}
              type='checkbox'
              className="mt-1"
            />
            <label
              htmlFor={todo.id}
              className={todo.isCompleted ? 'line-through' : ''}
            >
              {todo.title}
            </label>
            <span className={todoItems.category}>
              {todo.category ?? 'All'}
            </span>
            {todo.isArchived ? (
              <button
                onClick={() => store.unarchiveTodo(todo.id)}
                type="button"
                className={todoItems.actionBtn}
              >
                <Undo2 size={20} strokeWidth={2} />
              </button>
            ) : (
             <button
              onClick={() => store.removeTodo(todo.id)}
              type="button"
              className={todoItems.actionBtn}
             >
              <Trash size={20} strokeWidth={2} />
             </button>
            )}
          </div>
        ))
      }
        </div>
        <div className={todoItems.contentFooter}>
          <div className={todoItems.count}>{completedLabel}</div>
          {hasCompleted ? (
            <button
              onClick={store.archiveCompleted}
              type="button"
              className={todoItems.bulkActionBtn}
            >
              <ArchiveRestore size={16} strokeWidth={2} />
              <span>Archive completed</span>
            </button>
          ) : null}
          {hasArchived ? (
            <button
              onClick={store.clearArchived}
              type="button"
              className={todoItems.bulkActionBtn}
            >
              <ArchiveRestore size={16} strokeWidth={2} />
              <span>Clear archived</span>
            </button>
          ) : null}
       </div>
    </div>
  )
}`,
        }}
      />
    </div>
  );
};
