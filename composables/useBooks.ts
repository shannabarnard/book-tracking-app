import type { Book, CreateBookRequest, SortOrder, UpdateBookRequest } from '~/types/book'
import type { ApiProblem, PagedResult } from '~/types/api'

export interface GetBooksParams {
  page: number
  pageSize: number
  q?: string
  order?: SortOrder
}

export interface UseBooksApi {
  getBooks: (params: GetBooksParams) => Promise<PagedResult<Book>>
  getBook: (id: string) => Promise<Book>
  addBook: (payload: CreateBookRequest) => Promise<Book>
  updateBook: (id: string, payload: UpdateBookRequest) => Promise<Book>
  deleteBook: (id: string) => Promise<void>
}

function toApiProblem(err: unknown): ApiProblem {
  // Nuxt $fetch throws a "FetchError" with `data` and `statusCode` fields.
  if (typeof err === 'object' && err !== null) {
    const maybe = err as {
      statusCode?: number
      data?: unknown
      message?: string
    }

    const status = maybe.statusCode

    if (maybe.data && typeof maybe.data === 'object') {
      const dataObj = maybe.data as Partial<ApiProblem>
      if (typeof dataObj.title === 'string' && typeof dataObj.detail === 'string') {
        return { title: dataObj.title, detail: dataObj.detail, status }
      }
    }

    if (typeof maybe.message === 'string') {
      return { title: 'Request failed', detail: maybe.message, status }
    }
  }

  return { title: 'Request failed', detail: 'An unexpected error occurred.' }
}

export function useBooks(): UseBooksApi {
  const config = useRuntimeConfig()

  const baseURL = config.public.apiBaseUrl || ''

  async function getBooks(params: GetBooksParams): Promise<PagedResult<Book>> {
    try {
      return await $fetch<PagedResult<Book>>('/api/books', {
        baseURL,
        query: {
          page: params.page,
          pageSize: params.pageSize,
          q: params.q || undefined,
          order: params.order || undefined
          // sort is fixed by contract ("title"), so not needed
        }
      })
    } catch (err) {
      throw toApiProblem(err)
    }
  }

  async function getBook(id: string): Promise<Book> {
    try {
      return await $fetch<Book>(`/api/books/${encodeURIComponent(id)}`, { baseURL })
    } catch (err) {
      throw toApiProblem(err)
    }
  }

  async function addBook(payload: CreateBookRequest): Promise<Book> {
    try {
      return await $fetch<Book>('/api/books', {
        baseURL,
        method: 'POST',
        body: payload
      })
    } catch (err) {
      throw toApiProblem(err)
    }
  }

  async function updateBook(id: string, payload: UpdateBookRequest): Promise<Book> {
    try {
      return await $fetch<Book>(`/api/books/${encodeURIComponent(id)}`, {
        baseURL,
        method: 'PATCH',
        body: payload
      })
    } catch (err) {
      throw toApiProblem(err)
    }
  }

  async function deleteBook(id: string): Promise<void> {
    try {
      await $fetch<void>(`/api/books/${encodeURIComponent(id)}`, {
        baseURL,
        method: 'DELETE'
      })
    } catch (err) {
      throw toApiProblem(err)
    }
  }

  return { getBooks, getBook, addBook, updateBook, deleteBook }
}
