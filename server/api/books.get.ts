// COMMENT SB: Used AI to create mock server as running out of time.
import type { Book, BooksResponse } from '~/composables/useBooksQuery'

type FakerBook = {
  title: string
  author: string
  genre: string
  description: string
  isbn: string
  image: string
  published: string
  publisher: string
}

type FakerBooksResponse = {
  status: string
  code: number
  total: number
  data: FakerBook[]
}

function clampInt(value: number, min: number, max: number): number {
  const rounded = Math.floor(value)
  if (!Number.isFinite(rounded)) return min
  return Math.min(Math.max(rounded, min), max)
}

export default defineEventHandler(async (event): Promise<BooksResponse> => {
  const query = getQuery(event)

  const rawPageSize = query.pageSize ?? query.limit ?? '10'
  const parsedPageSize = typeof rawPageSize === 'string' ? Number(rawPageSize) : Number(rawPageSize)
  const pageSize = clampInt(parsedPageSize, 1, 50)

  const res = await $fetch<FakerBooksResponse>('https://fakerapi.it/api/v1/books', {
    query: { _quantity: pageSize }
  })

  const items: Book[] = res.data.map((b) => ({
    id: b.isbn,
    title: b.title,
    author: b.author,
    genre: b.genre,
    description: b.description,
    isbn: b.isbn,
    image: b.image,
    published: b.published,
    publisher: b.publisher,
    rating: 0,
    comments: ''
  }))

  return { items }
})
