export interface PagedResult<T> {
  items: T[]
  page: number
  pageSize: number
  total: number
}

export interface ApiProblem {
  title: string
  detail: string
  status?: number
}
