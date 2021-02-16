import Ajv from "ajv"
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

const BookSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    Author: {
      properties: {
        name: {
          type: 'string'
        },
        surname: {
          type: 'string'
        }
      },
      required: [
        'name',
        'surname'
      ],
      type: 'object'
    }
  },
  properties: {
    ISBN: {
      type: 'string'
    },
    authors: {
      items: {
        $ref: '#/definitions/Author'
      },
      type: 'array'
    },
    categories: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    description: {
      type: 'string'
    },
    id: {
      type: 'string'
    },
    keywords: {
      items: {
        type: 'string'
      },
      type: 'array'
    },
    length: {
      type: 'number'
    },
    name: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    publisher: {
      type: 'string'
    }
  },
  required: [
    'ISBN',
    'authors',
    'categories',
    'description',
    'keywords',
    'length',
    'name',
    'price',
    'publisher',
  ],
  type: 'object'
};

export const validateBook = (data: Book) => {
  const ajv = new Ajv({ allErrors: true, removeAdditional: 'all' });
  const valid = ajv.validate(BookSchema, data);

  return {
    errors: ajv.errors,
    valid: !!valid
  };
};