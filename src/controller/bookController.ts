import { Book, validateBook } from '../model/book'
import { Store } from '../store/store'
import express from 'express'

export class BookController {
  store: Store

  constructor(store: Store) {
    this.store = store
  }

  getBooks(req: express.Request, res: express.Response): void {
    const result = this.store.getBooks()

    return this.returnOk(res, result)
  }

  getBook(req: express.Request, res: express.Response): void {
    const id = this.getId(req)
    const result = this.store.getBook(id)

    return this.returnOk(res, result)
  }

  postBook(req: express.Request, res: express.Response): void {
    const book = req.body
    const validationResult = validateBook(book)
    if (!validationResult.valid) {
      const errors = validationResult.errors.map(error => error.message)
      return this.returnError(res, 400, errors)
    }

    const result = this.store.saveBook(book)

    return this.returnOk(res, result)
  }

  putBook(req: express.Request, res: express.Response): void {
    const book = req.body
    const id = this.getId(req)

    if (book && book.id && book.id !== id) {
      return this.returnError(res, 400, 'Book ID in body not matching Book ID in path.')
    }

    const validationResult = validateBook(book)
    if (!validationResult.valid) {
      const errors = validationResult.errors.map(error => error.message)
      return this.returnError(res, 400, errors)
    }

    if (!book.id) {
      book.id = id
    }

    const oldBook = this.store.getBook(id)
    if (!oldBook) {
      return this.returnError(res, 400, `Book with ID ${id} not found.`)
    }

    const result = this.store.saveBook(book)
    this.returnOk(res, result)
  }

  deleteBook(req: express.Request, res: express.Response): void {
    const id = this.getId(req)
    const result = this.store.deleteBook(id)
    if (result) {
      return this.returnOk(res, { result: 'ok' })
    }

    return this.returnError(res, 404, `Unable to delete book #${id}.`)
  }

  private returnError(res: express.Response, status: number, message: string | string[]): void {
    res.status(status).json({
      error: message
    })
  }

  private returnOk(res: express.Response, data: Book | Book[] | Record<string, unknown>): void {
    res.status(200).json(data)
  }
  
  private getId(req: express.Request) {
    return req.params.id
  }
}