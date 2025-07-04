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
  container: 'mx-auto max-w-2xl grid grid-cols-[1fr_40px] gap-4 p-6 bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  grid: 'grid grid-cols-[minmax(110px,15%)_1fr] gap-4',
  addTodo: 'absolute inset-x-0 bottom-0 p-2 rounded-sm cursor-pointer disabled:cursor-none disabled:bg-neutral-300 bg-neutral-400/70 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 text-neutral-600 hover:text-white focus:text-white grid place-items-center transition',
}
  
export const categoryTabs = {
  container: 'mt-6 mx-auto max-w-2xl flex flex-wrap gap-2',
  base: 'px-3 py-1 rounded-full flex items-center gap-2 text-sm font-mono border cursor-pointer transition uppercase',
  default: 'border-neutral-200 bg-neutral-200 hover:bg-indigo-200 hover:border-indigo-300 text-neutral-950 hover:text-indigo-950 hover:shadow-sm',
  active: 'bg-indigo-200 border-indigo-300 text-indigo-600', 
}
  
export const todoItems = {
  emptyContainer: 'mt-6 mx-auto max-w-2xl grid place-item-center p-10 bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  container: 'mt-6 mx-auto max-w-2xl grid grid-flow-row auto-rows-max gap-6 p-6 bg-neutral-100 border border-neutral-300 shadow-xs rounded-md',
  grid: 'grid grid-cols-[20px_1fr_max-content_20px] items-start gap-3',
  category: 'font-mono text-xs uppercase leading-3 bg-indigo-100 text-indigo-400 p-1 rounded',
  actionBtn: 'text-neutral-900 hover:text-indigo-600 cursor-pointer',
  bulkActionBtn: 'px-2 py-1 rounded-sm cursor-pointer bg-neutral-400/70 hover:bg-indigo-400 focus:bg-indigo-400 outline-indigo-400 focus:outline-1 text-xs text-neutral-600 hover:text-white focus:text-white disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-auto grid place-content-center gap-2 transition',
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
          "/state.ts": `export type Todo = {
  id: string
  createdAt: number
  title: string
  category?: string
  isCompleted: boolean
  isArchived: boolean
}

export type TodoState = {
  todoList: Map<string, Todo>
  categoryList: Set<string>
  selectedCategory: string
}

export const initialTodoState: TodoState = {
  todoList: new Map([
    ['1', { id: "1", createdAt: 1750214733220, title: 'Buy groceries', category: 'Shopping', isCompleted: false, isArchived: false, }],
    ['2', { id: "2", createdAt: 1750214733240, title: 'Complete project report', category: 'Work', isCompleted: false, isArchived: false, }],
    ['3', { id: "3", createdAt: 1750214733260, title: 'Call mom', category: 'Personal', isCompleted: true, isArchived: false, }],
    ['4', { id: "4", createdAt: 1750214733280, title: 'Read a book', category: 'Hobby', isCompleted: false, isArchived: false, }],
    ['5', { id: "5", createdAt: 1750214733300, title: 'Plan vacation', category: 'Personal', isCompleted: false, isArchived: false, }],
    ['6', { id: "6", createdAt: 1750214733320, title: 'Buy new shoes', category: 'Shopping', isCompleted: false, isArchived: false, }],
    ['7', { id: "7", createdAt: 1750214733340, title: 'Finish coding assignment', category: 'Work', isCompleted: true, isArchived: false, }],
  ]),
  categoryList: new Set(['All', 'Work', 'Personal', 'Shopping', 'Hobby']),
  selectedCategory: 'All',
}`,
          "/store.ts": {
            code: `import { createStore, type SetStateFn } from 'muestate'
import { type TodoState, initialTodoState } from './state'
    
const makeMethods = (setState: SetStateFn<TodoState>) => ({
  addTodo: (title: string, category: string) => {
    const id = String((Math.random() * 1000000).toFixed(0))
    setState((state) => {
      state.todoList.set(id, {
        id,
        createdAt: Date.now(),
        title,
        category,
        isCompleted: false,
        isArchived: false
      });
      state.selectedCategory = 'All'
      return state
    })
  },
  addCategory: (category: string) => {
    setState((state) => {
      state.categoryList.add(category)
      return state
    })
  },
  toggleTodo: (id: string) => {
    setState((state) => {
      const todo = state.todoList.get(id)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
      return state
    })
  },
  removeTodo: (id: string) => {
    setState((state) => {
      const isCompleted = state.todoList.get(id).isCompleted
      if (isCompleted) {
        state.todoList.delete(id)
      }
      return state
    })
  },
  setSelectedCategory: (category: string) => {
    setState((state) => {
      state.selectedCategory = category
      return state
    })
  },
  archiveCompleted: () => {
    setState((state) => {
      for (const todo of state.todoList.values()) {
        const isAllCategory = state.selectedCategory === 'All' && todo.isCompleted;
        const isOtherCategory = state.selectedCategory !== 'All' && todo.isCompleted && todo.category === state.selectedCategory;

        if (isAllCategory || isOtherCategory) {
          todo.isArchived = true;
        }
      }
      return state;
    });
  },
  unarchiveTodo: (id: string) => {
    setState((state) => {
      const todo = state.todoList.get(id);
      if (todo) {
        todo.isCompleted = false;
        todo.isArchived = false;
      }

      const hasOtherArchived = Array.from(state.todoList.values()).some(todo => todo.isArchived);
      if (!hasOtherArchived) {
        state.selectedCategory = 'All';
      }

      return state;
    });
  },
  clearArchived: () => {
    setState((state) => {
      for (const [id, todo] of state.todoList.entries()) {
        if (todo.isArchived) {
          state.todoList.delete(id);
        }
      }
      state.selectedCategory = 'All';
      return state;
    });
  }
});

export const [
  useTodoStore,
  useTodoState,
  TodoProvider
] = createStore(initialTodoState, makeMethods)`,
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
        <TodoForm />
        <CategoryTab />
        <TodoList />
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
        <p className='text-neutral-500'>{selectedCategory === 'All' ? 'Add a new todo.' : 'No todos under "' + selectedCategory + '"'}</p>
      </div>
    )
  }
  
  const completedCount = todoList.filter(todo => todo.isCompleted).length
  const archivedCount = todoList.filter(todo => todo.isArchived).length
  const hasCompleted = selectedCategory !== 'Archived' && completedCount > 0
  const hasArchived = selectedCategory === 'Archived' && archivedCount > 0

  const completedLabel = completedCount + '/' + todoList.length + ' completed'
  const archiveCompletedLabel = 'Archive completed' + (completedCount > 0 ? ' (' + completedCount + ')' : '')
  const clearArchivedLabel = 'Clear archived' + (archivedCount > 0 ? ' (' + archivedCount + ')' : '')

  return (
    <div className={todoItems.container}>
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
      <div>{completedLabel}</div>
      {hasCompleted ? (
        <button
          onClick={store.archiveCompleted}
          type="button"
          className={todoItems.bulkActionBtn}
        >
          <ArchiveRestore size={16} strokeWidth={2} />
          <span>
            {archiveCompletedLabel}
          </span>
        </button>
      ) : null}
      {hasArchived ? (
        <button
          onClick={store.clearArchived}
          type="button"
          className={todoItems.bulkActionBtn}
        >
          <ArchiveRestore size={16} strokeWidth={2} />
          <span>
            {clearArchivedLabel}
          </span>
        </button>
      ) : null}
    </div>
  )
}`,
        }}
      />
    </div>
  );
};
