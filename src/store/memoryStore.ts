import { Book } from '../model/book'
import { Store } from './store'
import { v4 as uuidv4 } from 'uuid';


type BookMemoryStore = Record<string, Book>
const books: BookMemoryStore = {}

export class MemoryStore implements Store {
  getBooks() {
    const result: Book[] = [];

    return result
  }

  getBook(id: string) {
    return books[id]
  }

  saveBook(book: Book) {
    if (!book.id) {
      book.id = uuidv4()
    }
    books[book.id] = book
    return books[book.id]
  }

  deleteBook(id: string) {
    delete books[id]
    return true
  }
}