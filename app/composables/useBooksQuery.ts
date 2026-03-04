import type { Book, SortOrder } from '~/types/book'
import type { ApiProblem, PagedResult } from '~/types/api'

interface BooksQueryOptions {
  initialPage?: number
  initialPageSize?: number
  initialSearch?: string
  initialSortOrder?: SortOrder
  debounceMs?: number
}
