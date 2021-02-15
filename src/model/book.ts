import { Author } from './author'

export interface Book {
  id: string
  name: string
  price: Number
  description: string
  authors: [Author]
  keywords: [string]
  ISBN: string
  categories: [string]
}