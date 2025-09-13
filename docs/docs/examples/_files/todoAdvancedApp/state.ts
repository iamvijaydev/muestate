export const state = `
export type Todo = {
  id: string
  createdAt: number
  title: string
  category?: string
  isCompleted: boolean
  isArchived: boolean
}

export type TodoState = {
  categoryList: Set<string>
  selectedCategory: string
  todoList: Map<string, Todo>
  currentTodos: Todo[]
}

export const getCurrentTodos = (
  todoList: Map<string, Todo>,
  selectedCategory: string = 'All'
): Todo[] => {
  return Array.from(todoList.values())
    .filter(todo => {
      if (selectedCategory === 'Archived') {
        return todo.isArchived
      }

      if (selectedCategory === 'All') {
        return !todo.isArchived
      }

      return !todo.isArchived && todo.category === selectedCategory
    })
    .sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1
      }
      return b.createdAt - a.createdAt
    })
}

const todoList = new Map([
  ['2a834336-7e67-4bfb-8f61-3736afbe2484', {
    id: "2a834336-7e67-4bfb-8f61-3736afbe2484",
    createdAt: 1750214733220,
    title: 'Buy groceries',
    category: 'Shopping',
    isCompleted: false,
    isArchived: false
  }],
  ['24215d29-cdaa-4120-ae48-48c81a2082b7', {
    id: "24215d29-cdaa-4120-ae48-48c81a2082b7",
    createdAt: 1750214733240,
    title: 'Complete project report',
    category: 'Work',
    isCompleted: false,
    isArchived: false
  }],
  ['c4fd6586-9cda-4075-b6f8-ac7bdf8bd572', {
    id: "c4fd6586-9cda-4075-b6f8-ac7bdf8bd572",
    createdAt: 1750214733260,
    title: 'Call mom',
    category: 'Personal',
    isCompleted: true,
    isArchived: false
  }],
  ['cbd545dc-f4b7-41f4-830b-4e7282b99ad3', {
    id: "cbd545dc-f4b7-41f4-830b-4e7282b99ad3",
    createdAt: 1750214733280,
    title: 'Read a book',
    category: 'Hobby',
    isCompleted: false,
    isArchived: false
  }],
  ['aced9617-c634-48d4-9bc1-50e7ba5e8e5d', {
    id: "aced9617-c634-48d4-9bc1-50e7ba5e8e5d",
    createdAt: 1750214733300,
    title: 'Plan vacation',
    category: 'Personal',
    isCompleted: false,
    isArchived: false
  }],
  ['2478cec0-3784-49e8-a2db-cf015fac3f3e', {
    id: "2478cec0-3784-49e8-a2db-cf015fac3f3e",
    createdAt: 1750214733320,
    title: 'Buy new shoes',
    category: 'Shopping',
    isCompleted: false,
    isArchived: false
  }],
  ['6e16c9ec-33c4-4a91-aaca-a429e35faaa9', {
    id: "6e16c9ec-33c4-4a91-aaca-a429e35faaa9",
    createdAt: 1750214733340,
    title: 'Finish coding assignment',
    category: 'Work',
    isCompleted: true,
    isArchived: false
  }],
])
const currentTodos = getCurrentTodos(todoList);

export const initialTodoState: TodoState = {
  categoryList: new Set(['All', 'Work', 'Personal', 'Shopping', 'Hobby']),
  selectedCategory: 'All',
  todoList,
  currentTodos,
}
`