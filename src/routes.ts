import express from 'express'
import { BookController } from './controller/bookController'
import { MemoryStore } from './store/memoryStore'

export function buildRoutes(app: express.Express): void {
  const bookController = new BookController(new MemoryStore())

  app.get('/books', (req: express.Request, res: express.Response) => { bookController.getBooks(req, res) })
  app.get('/books/:id', (req: express.Request, res: express.Response) => { bookController.getBook(req, res) })
  app.post('/books/', (req: express.Request, res: express.Response) => { bookController.postBook(req, res) })
  app.put('/books/:id', (req: express.Request, res: express.Response) => { bookController.putBook(req, res) })
  app.delete('/books/:id', (req: express.Request, res: express.Response) => { bookController.deleteBook(req, res) })
}

