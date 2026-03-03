// frontend/utils/validation.ts
import type { CreateBookRequest, Rating, UpdateBookRequest } from '~/types/book'

export interface FieldErrors {
  title?: string
  author?: string
  isbn?: string
  rating?: string
  comments?: string
  noteStatus?: string
  coverImageUrls?: string
}

export const LIMITS = {
  titleMax: 200,
  authorMax: 120,
  isbnMin: 10,
  isbnMax: 17,
  commentsMax: 1000,
  coverUrlMax: 2048,
  coverUrlsMaxCount: 5
} as const

export function isValidRating(rating: number): rating is Rating {
  return rating === 1 || rating === 2 || rating === 3 || rating === 4 || rating === 5
}

function containsDisallowedWord(value: string, word: string): boolean {
  return value.toLowerCase().includes(word.toLowerCase())
}

export function validateCreateBook(input: CreateBookRequest): FieldErrors {
  const e: FieldErrors = {}

  const title = input.title.trim()
  const author = input.author.trim()
  const isbn = input.isbn.trim()
  const comments = (input.comments ?? '').trim()
  const rating = input.rating

  // Title
  if (title.length === 0) e.title = 'Please enter a title.'
  else if (title.length > LIMITS.titleMax) e.title = `Title must be ${LIMITS.titleMax} characters or fewer.`

  // Author
  if (author.length === 0) e.author = 'Please enter an author.'
  else if (author.length > LIMITS.authorMax) e.author = `Author must be ${LIMITS.authorMax} characters or fewer.`

  // ISBN
  if (isbn.length === 0) e.isbn = 'Please enter an ISBN.'
  else if (isbn.length < LIMITS.isbnMin || isbn.length > LIMITS.isbnMax) {
    e.isbn = `ISBN must be between ${LIMITS.isbnMin} and ${LIMITS.isbnMax} characters.`
  }

  // Rating (optional in Add)
  if (rating !== undefined) {
    if (!isValidRating(rating)) e.rating = 'Rating must be between 1 and 5.'

    // Comments required if rating supplied
    if (comments.length === 0) {
      e.comments = 'Please add a comment when providing a rating.'
    }
  }

  // Comments rules (whenever comments exist)
  if (comments.length > LIMITS.commentsMax) {
    e.comments = `Comments must be ${LIMITS.commentsMax} characters or fewer.`
  } else if (comments.length > 0 && containsDisallowedWord(comments, 'horrible')) {
    e.comments = `Please remove the word "horrible" from your comment.`
  }

  // Cover URLs (optional)
  const urls = input.coverImageUrls ?? []
  if (urls.length > LIMITS.coverUrlsMaxCount) {
    e.coverImageUrls = `You can add up to ${LIMITS.coverUrlsMaxCount} cover image URLs.`
  } else if (urls.some(u => u.trim().length === 0 || u.length > LIMITS.coverUrlMax)) {
    e.coverImageUrls = `Each cover URL must be non-empty and ${LIMITS.coverUrlMax} characters or fewer.`
  }

  return e
}

export function validateUpdateBook(input: UpdateBookRequest): FieldErrors {
  const e: FieldErrors = {}

  // Edit: rating required
  if (!isValidRating(input.rating)) e.rating = 'Rating must be between 1 and 5.'

  // Edit: comments required (because rating always present)
  const comments = input.comments.trim()
  if (comments.length === 0) e.comments = 'Please add a comment.'
  else if (comments.length > LIMITS.commentsMax) e.comments = `Comments must be ${LIMITS.commentsMax} characters or fewer.`
  else if (containsDisallowedWord(comments, 'horrible')) e.comments = `Please remove the word "horrible" from your comment.`

  return e
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some(v => typeof v === 'string' && v.length > 0)
}
