import { MemoryStore } from './memoryStore'
import { Book } from '../model/book'
import should from 'should';

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
    should(saveResult).be.deepEqual(testBook)
  })

  it('should retrieve the book by ID', () => {
    const getResult = store.getBook(testBook.id)
    should(getResult).be.deepEqual(testBook)
  })

  it('should generate a new ID and save the book if a book does not contain it'4, () => {
    let testBookCopy = { ...testBook }
    delete testBookCopy.id
    const saveResult = store.saveBook(testBookCopy)
    should(saveResult.id).not.be.empty()
    should(saveResult.id).not.equal(testBook.id)    
  })
});