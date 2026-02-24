import type { Todo } from "../types/Todo"

let nextTodoId = 3

const todos: Todo[] = [
  {
    id: 1,
    name: "Buy groceries",
    dueDate: "2024-12-31",
    completed: false,
  },
  {
    id: 2,
    name: "Walk the dog",
    dueDate: "2024-12-31",
    completed: false,
  },
]

// Get all todos
export const getTodos = (): Todo[] => [...todos]

// Get todo by id
export const getTodoById = (id: number): Todo | undefined =>
  todos.find((todo) => todo.id === id)

// Create todo
export const createTodo = (name: string, dueDate: string): Todo => {
  const newTodo: Todo = {
    id: nextTodoId++,
    name,
    dueDate,
    completed: false,
  }

  todos.push(newTodo)
  return newTodo
}

// Update todo (now takes id instead of todo object)
export const updateTodo = (
  id: number,
  updates: Partial<Omit<Todo, "id">>
): Todo | undefined => {
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) return undefined

  todos[index] = { ...todos[index], ...updates }
  return todos[index]
}

// Delete todo
export const deleteTodoById = (id: number): Todo | undefined => {
  const index = todos.findIndex((todo) => todo.id === id)
  if (index === -1) return undefined

  const [deleted] = todos.splice(index, 1)
  return deleted
}