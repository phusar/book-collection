import { Author } from './author'

export interface Book {
  id?: string
  name: string
  price: number
  description: string
  authors: Author[]
  keywords: string[]
  ISBN: string
  categories: string[]
  length: number
  publisher: string
}