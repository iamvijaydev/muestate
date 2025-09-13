export const state = `
export type Todo = {
  id: string
  createdAt: number
  title: string
  isCompleted: boolean
}

export type TodoState = {
  todoList: Map<string, Todo>
}

export const initialTodoState: TodoState = {
  todoList: new Map([
    ['2a834336-7e67-4bfb-8f61-3736afbe2484', {
      id: "2a834336-7e67-4bfb-8f61-3736afbe2484",
      createdAt: 1750214733220,
      title: 'Buy groceries',
      isCompleted: false,
    }],
    ['24215d29-cdaa-4120-ae48-48c81a2082b7', {
      id: "24215d29-cdaa-4120-ae48-48c81a2082b7",
      createdAt: 1750214733240,
      title: 'Complete project report',
      isCompleted: false,
    }],
    ['c4fd6586-9cda-4075-b6f8-ac7bdf8bd572', {
      id: "c4fd6586-9cda-4075-b6f8-ac7bdf8bd572",
      createdAt: 1750214733260,
      title: 'Call mom',
      isCompleted: true,
    }],
    ['cbd545dc-f4b7-41f4-830b-4e7282b99ad3', {
      id: "cbd545dc-f4b7-41f4-830b-4e7282b99ad3",
      createdAt: 1750214733280,
      title: 'Read a book',
      isCompleted: false,
    }],
    ['aced9617-c634-48d4-9bc1-50e7ba5e8e5d', {
      id: "aced9617-c634-48d4-9bc1-50e7ba5e8e5d",
      createdAt: 1750214733300,
      title: 'Plan vacation',
      isCompleted: false,
    }],
    ['2478cec0-3784-49e8-a2db-cf015fac3f3e', {
      id: "2478cec0-3784-49e8-a2db-cf015fac3f3e",
      createdAt: 1750214733320,
      title: 'Buy new shoes',
      isCompleted: false,
    }],
    ['6e16c9ec-33c4-4a91-aaca-a429e35faaa9', {
      id: "6e16c9ec-33c4-4a91-aaca-a429e35faaa9",
      createdAt: 1750214733340,
      title: 'Finish coding assignment',
      isCompleted: true,
    }],
  ]),
}
`