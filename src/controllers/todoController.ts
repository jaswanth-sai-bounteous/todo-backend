import type { Request, Response } from "express"
import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  updateTodo,
} from "../service/todos"
import type { Todo } from "../types/Todo"

// Get all todos
export const listTodos = (_req: Request, res: Response): void => {
  res.json(getTodos())
}

// Get single todo
export const getSingleTodo = (req: Request, res: Response): void => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid todo id" })
    return
  }

  const todo = getTodoById(id)

  if (!todo) {
    res.status(404).json({ message: "Todo not found" })
    return
  }

  res.json(todo)
}

// Create todo
export const createSingleTodo = (req: Request, res: Response): void => {
  const { name, dueDate } = req.body as Partial<Todo>

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ message: "Todo name is required" })
    return
  }

  if (!dueDate || typeof dueDate !== "string") {
    res.status(400).json({ message: "Valid dueDate is required" })
    return
  }

  const newTodo = createTodo(name.trim(), dueDate)
  res.status(201).json(newTodo)
}

// Update todo
export const updateSingleTodo = (req: Request, res: Response): void => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid todo id" })
    return
  }

  const updates = req.body as Partial<Omit<Todo, "id">>

  const updated = updateTodo(id, updates)

  if (!updated) {
    res.status(404).json({ message: "Todo not found" })
    return
  }

  res.json(updated)
}

// Delete todo
export const deleteSingleTodo = (req: Request, res: Response): void => {
  const id = Number(req.params.id)

  if (Number.isNaN(id)) {
    res.status(400).json({ message: "Invalid todo id" })
    return
  }

  const deleted = deleteTodoById(id)

  if (!deleted) {
    res.status(404).json({ message: "Todo not found" })
    return
  }

  res.json(deleted)
}