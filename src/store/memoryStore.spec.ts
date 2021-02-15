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

  it('should generate a new ID and save the book if it book does not contain an ID', () => {
    let testBookCopy = { ...testBook }
    delete testBookCopy.id
    const saveResult = store.saveBook(testBookCopy)
    should(saveResult.id).not.be.empty()
    should(saveResult.id).not.equal(testBook.id)    
  })

  it('should return two books from the store', () => {
    const getResult = store.getBooks()
    should.exist(getResult)
    should.exist(getResult[1])
    should(getResult[0].id).equal(testBook.id)
    should(getResult[1].id).not.equal(testBook.id)
    should(getResult.length).equal(2)
  })

  it('should delete a book from the store', () => {
    let getResult = store.getBooks()
    const deleteResult = store.deleteBook(getResult[1].id)
    getResult = store.getBooks()
    should(deleteResult).be.ok()
    should(getResult.length).equal(1)
    should(getResult[0].id).equal(testBook.id)
  })

  it('should overwrite an existing book on save', () => {
    const oldBook = store.getBook(testBook.id)
    const updatedBook = { ...oldBook }
    updatedBook.name = 'I changed the name!'
    const saveResult = store.saveBook(updatedBook)
    should(saveResult.name).not.equal(testBook.name)
  })
});