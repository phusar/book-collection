import { Book } from '../model/book'

export interface Store {
  getBooks(): Book[]
  getBook(id: string): Book
  saveBook(book: Book): Book
  deleteBook(id: string): boolean
}