import type { Ref, ComputedRef } from 'vue'

export type Book = {
  id: string
  title: string
  author: string
  genre: string
  description: string
  isbn: string
  image: string
  published: string
  publisher: string
  rating: number
  comments: string
}

export type BooksResponse = {
  items: Book[]
}

export type UseBooksQueryOptions = {
  initialPageSize?: number
}

export type UseBooksQueryResult = {
  items: ComputedRef<Book[]>
  pending: Ref<boolean>
  error: Ref<unknown>
  pageSize: Ref<number>
  refresh: () => Promise<void>
  setPageSize: (next: number) => void
}

function clampInt(value: number, min: number, max: number): number {
  const rounded = Math.floor(value)
  if (!Number.isFinite(rounded)) return min
  return Math.min(Math.max(rounded, min), max)
}

export function useBooksQuery(options?: UseBooksQueryOptions): UseBooksQueryResult {
  const pageSize = ref<number>(options?.initialPageSize ?? 5)

  const { data, pending, error, refresh } = useFetch<BooksResponse>('/api/books', {
    query: computed(() => ({ pageSize: pageSize.value })),
    default: (): BooksResponse => ({ items: [] })
  })

  const items = computed<Book[]>(() => data.value?.items ?? [])

  function setPageSize(next: number): void {
    pageSize.value = clampInt(next, 1, 50)
  }

  async function safeRefresh(): Promise<void> {
    await refresh()
  }

  return {
    items,
    pending,
    error,
    pageSize,
    refresh: safeRefresh,
    setPageSize
  }
}
