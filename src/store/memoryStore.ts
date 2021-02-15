import { Book } from '../model/book'
import { Store } from './store'
import { v4 as uuidv4 } from 'uuid';


type BookMemoryStore = Record<string, Book>
const books: BookMemoryStore = {}

export class MemoryStore implements Store {
  getBooks(): Book[] {
    const result: Book[] = [];
    for (const id in books) {
      result.push(books[id])
    }
    return result
  }

  getBook(id: string): Book {
    return books[id]
  }

  saveBook(book: Book): Book {
    if (!book.id) {
      book.id = uuidv4()
    }
    books[book.id] = book
    return books[book.id]
  }

  deleteBook(id: string): boolean {
    delete books[id]
    return true
  }
}