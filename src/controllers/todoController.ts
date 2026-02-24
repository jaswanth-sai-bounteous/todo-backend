import type { Request, Response } from "express"
import {
  createTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  updateTodo,
} from "../service/todos"

import {
  createTodoSchema,
  updateTodoSchema,
  idParamSchema,
} from "../validators/todoValidators"

// Get all
export const listTodos = (_req: Request, res: Response): void => {
  res.json(getTodos())
}

// Get one
export const getSingleTodo = (req: Request, res: Response): void => {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten())
    return
  }

  const todo = getTodoById(parsed.data.id)

  if (!todo) {
    res.status(404).json({ message: "Todo not found" })
    return
  }

  res.json(todo)
}

// Create
export const createSingleTodo = (req: Request, res: Response): void => {
  const parsed = createTodoSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten())
    return
  }

  const { name, dueDate } = parsed.data
  const newTodo = createTodo(name, dueDate)

  res.status(201).json(newTodo)
}

// Update
export const updateSingleTodo = (req: Request, res: Response): void => {
  const idParsed = idParamSchema.safeParse(req.params)
  if (!idParsed.success) {
    res.status(400).json(idParsed.error.flatten())
    return
  }

  const bodyParsed = updateTodoSchema.safeParse(req.body)
  if (!bodyParsed.success) {
    res.status(400).json(bodyParsed.error.flatten())
    return
  }

  const updated = updateTodo(idParsed.data.id, bodyParsed.data)

  if (!updated) {
    res.status(404).json({ message: "Todo not found" })
    return
  }

  res.json(updated)
}

// Delete
export const deleteSingleTodo = (req: Request, res: Response): void => {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) {
    res.status(400).json(parsed.error.flatten())
    return
  }

  const deleted = deleteTodoById(parsed.data.id)

  if (!deleted) {
    res.status(404).json({ message: "Todo not found" })
    return
  }

  res.json(deleted)
}