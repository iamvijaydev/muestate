export const store = `
import { v4 as uuid } from 'uuid'
import { createStore, type SetStateFn } from 'muestate'
import { type TodoState, initialTodoState, getCurrentTodos } from './state'
    
const makeMethods = (setState: SetStateFn<TodoState>) => ({
  addTodo: (title: string, category: string) => {
    const id = uuid()

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
      state.currentTodos = getCurrentTodos(state.todoList)

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
      state.todoList.delete(id)
      state.currentTodos = getCurrentTodos(state.todoList, state.selectedCategory)

      return state
    })
  },
  setSelectedCategory: (category: string) => {
    setState((state) => {
      state.selectedCategory = category
      state.currentTodos = getCurrentTodos(state.todoList, state.selectedCategory)
    
      return state
    })
  },
  archiveCompleted: () => {
    setState((state) => {
      for (const todo of state.todoList.values()) {
        const isAllCategory = state.selectedCategory === 'All' && todo.isCompleted
        const isOtherCategory = state.selectedCategory !== 'All' && todo.isCompleted && todo.category === state.selectedCategory

        if (isAllCategory || isOtherCategory) {
          todo.isArchived = true
        }
      }
      state.currentTodos = getCurrentTodos(state.todoList, state.selectedCategory)

      return state
    });
  },
  unarchiveTodo: (id: string) => {
    setState((state) => {
      const todo = state.todoList.get(id)
      if (todo) {
        todo.isCompleted = false
        todo.isArchived = false
      }

      const hasOtherArchived = Array.from(state.todoList.values()).some(todo => todo.isArchived)
      
      if (!hasOtherArchived) {
        state.selectedCategory = 'All'
      }
      state.currentTodos = getCurrentTodos(state.todoList, state.selectedCategory)

      return state
    });
  },
  removeArchived: () => {
    setState((state) => {
      for (const [id, todo] of state.todoList) {
        if (todo.isArchived) {
          state.todoList.delete(id)
        }
      }
      state.selectedCategory = 'All'
      state.currentTodos = getCurrentTodos(state.todoList, state.selectedCategory)

      return state
    });
  }
});

export const [
  useTodoStore,
  useTodoState,
  TodoProvider
] = createStore(initialTodoState, makeMethods)
`