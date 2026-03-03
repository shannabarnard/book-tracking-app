import type { CreateBookRequest, Rating, UpdateBookRequest } from '~/types/book'

export interface FieldErrors {
  title?: string
  author?: string
  isbn?: string
  rating?: string
  comments?: string
  coverImageUrls?: string
}

export function validateRating(rating?: number): rating is Rating {
  return rating === 1 || rating === 2 || rating === 3 || rating === 4 || rating === 5
}

export function validateCreateBook(input: CreateBookRequest): FieldErrors {
  const e: FieldErrors = {}

  if (!input.title.trim()) e.title = 'Title is required.'
  else if (input.title.length > 200) e.title = 'Max 200 characters.'

  if (!input.author.trim()) e.author = 'Author is required.'
  else if (input.author.length > 120) e.author = 'Max 120 characters.'

  if (!input.isbn.trim()) e.isbn = 'ISBN is required.'
  else if (input.isbn.length < 10 || input.isbn.length > 17) e.isbn = 'ISBN must be 10–17 characters.'

  if (input.rating !== undefined && !validateRating(input.rating)) e.rating = 'Rating must be 1–5.'

  const comments = (input.comments ?? '').trim()

  // requirement: comments required if rating supplied
  if (input.rating !== undefined && comments.length === 0) e.comments = 'Comments are required when rating is supplied.'
  if (comments.length > 1000) e.comments = 'Max 1000 characters.'
  if (comments.toLowerCase().includes('horrible')) e.comments = 'Comments may not contain the word \'horrible\'.'

  const urls = input.coverImageUrls ?? []
  if (urls.length > 5) e.coverImageUrls = 'Max 5 cover image URLs.'
  if (urls.some(u => u.trim().length === 0 || u.length > 2048)) e.coverImageUrls = 'Each URL must be non-empty and <= 2048 chars.'

  return e
}

export function validateUpdateBook(input: UpdateBookRequest): FieldErrors {
  const e: FieldErrors = {}
  if (!validateRating(input.rating)) e.rating = 'Rating must be 1–5.'

  const comments = input.comments.trim()
  if (comments.length === 0) e.comments = 'Comments are required.'
  if (comments.length > 1000) e.comments = 'Max 1000 characters.'
  if (comments.toLowerCase().includes('horrible')) e.comments = 'Comments may not contain the word \'horrible\'.'

  return e
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.values(errors).some(Boolean)
}
