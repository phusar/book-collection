import { Book } from '../model/book'

type BookMemoryStore = Record<string, Book>
const books: BookMemoryStore = { }

export function saveBook(book: Book) {
  books[book.id] = book
}

export function deleteBook(id: string) {
  delete books[id]
}