export const store = `
import { v4 as uuid } from 'uuid'
import { createStore, type SetStateFn } from 'muestate'
import { type TodoState, initialTodoState } from './state'
    
const getMethods = (setState: SetStateFn<TodoState>) => ({
  addTodo: (title: string) => {
    const id = uuid()
    setState((state) => {
      state.set(id, {
        id,
        createdAt: Date.now(),
        title,
        isCompleted: false,
      });
      return state
    })
  },
  toggleTodo: (id: string) => {
    setState((state) => {
      const todo = state.get(id)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
      return state
    })
  },
  removeTodo: (id: string) => {
    setState((state) => {
      state.delete(id)
      return state
    })
  },
  removeCompleted: () => {
    setState((state) => {
      for (let [id, todo] of state) {
        if (todo.isCompleted) {
          state.delete(id)
        }
      }
      return state;
    })
  }
});

export const [
  useTodoStore,
  useTodoState,
  TodoProvider
] = createStore(initialTodoState, getMethods)
`