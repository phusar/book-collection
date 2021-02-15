import { MemoryStore } from './memoryStore'
import { Book } from '../model/book'
import { strictEqual } from "assert";

const testBook: Book = {
  id: '1',
  name: 'A Song of Ice and Fire',
  price: 25.24,
  description: 'Winter is coming...',
  authors: [{
    name: 'George R. R.',
    surname: 'Martin'
  }],
  keywords: ['game of thrones', 'jon snow', 'winter is coming'],
  ISBN: '9780553593716',
  categories: ['fantasy', 'bestseller', 'tv'],
  length: 864,
  publisher: 'Bantam Media',
}


describe("memoryStore suite", () => {
  const store = new MemoryStore()

  it("should save a new book", () => {
    const saveResult = store.saveBook(testBook)
    strictEqual(saveResult, {})
  });
});