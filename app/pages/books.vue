<!-- pages/books.vue -->
<script setup lang="ts">
import type { Book } from '~/types/book'
import BooksToolbar from '~/components/books/BooksToolbar.vue'
import BooksList from '~/components/books/BooksList.vue'

const search = ref<string>('')
const sortOrder = ref<SortOrder>('asc')
const page = ref<number>(1)
const pageSize = 10

// Typed mock data (UI scaffold only; replace with API later)
const allBooks = ref<Book[]>([
  {
    id: 'b1',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    rating: 5,
    comments: 'Great practical guidance.',
    noteStatus: 'Read',
    coverImageUrls: []
  },
  {
    id: 'b2',
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    isbn: '9780201616224',
    rating: 4,
    comments: '',
    noteStatus: 'Reading',
    coverImageUrls: []
  },
  {
    id: 'b3',
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    isbn: '9780321125217',
    noteStatus: 'ToRead',
    coverImageUrls: []
  }
])

const filteredSorted = computed<Book[]>(() => {
  const term = search.value.trim().toLowerCase()

  let items = allBooks.value

  if (term.length > 0) {
    items = items.filter((b) => {
      return (
        b.title.toLowerCase().includes(term)
        || b.author.toLowerCase().includes(term)
      )
    })
  }

  items = [...items].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
  )

  if (sortOrder.value === 'desc') items.reverse()

  return items
})

const total = computed(() => filteredSorted.value.length)

const pagedBooks = computed<Book[]>(() => {
  const start = (page.value - 1) * pageSize
  const end = start + pageSize
  return filteredSorted.value.slice(start, end)
})

function onAdd() {
  // placeholder for modal open in a later commit
  console.info('Add Book clicked')
}
</script>

<template>
  <div class="space-y-6">
    <BooksHeader @add="onAdd" />

    <BooksToolbar
      :search="search"
      :sort-order="sortOrder"
      @update:search="search = $event"
      @update:sort-order="sortOrder = $event"
    />

    <div class="flex items-center text-sm text-slate-600">
      <span class="font-medium mr-1">{{ pagedBooks.length }}</span>
      of
      <span class="font-medium mx-1">{{ total }}</span>
      books
    </div>

    <BooksList
      :books="allBooks"
    />
  </div>
</template>
