export type Rating = 1 | 2 | 3 | 4 | 5

export type NoteStatus = 'ToRead' | 'Reading' | 'Read' | 'Abandoned'

export interface Book {
  id: string
  title: string
  author: string
  isbn: string
  rating?: Rating // optional (supports "rating supplied" validation later)
  comments?: string // optional (supports notes indicator)
  noteStatus: NoteStatus
  coverImageUrls: string[]
}

export type SortOrder = 'asc' | 'desc'
