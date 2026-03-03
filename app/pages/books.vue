<script setup lang="ts">
import type { Book, CreateBookRequest, SortOrder } from '~/types/book'
import BooksHeader from '~/components/books/BooksHeader.vue'
import BooksToolbar from '~/components/books/BooksToolbar.vue'
import BooksList from '~/components/books/BooksList.vue'
import AddBookModal from '~/components/books/AddBookModal.vue'

// UI state
const search = ref<string>('')
const sortOrder = ref<SortOrder>('asc')
const page = ref<number>(1)
const pageSize = 10

// Modal state
const addOpen = ref<boolean>(false)

// Local in-memory list (until MSW/API)
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
  }
])

function openAdd(): void {
  addOpen.value = true
}

function closeAdd(): void {
  addOpen.value = false
}

function onAddSave(payload: CreateBookRequest): void {
  // Create a Book from the CreateBookRequest
  const newBook: Book = {
    id: crypto.randomUUID(),
    title: payload.title.trim(),
    author: payload.author.trim(),
    isbn: payload.isbn.trim(),
    rating: payload.rating,
    comments: payload.comments?.trim() ?? '',
    noteStatus: payload.noteStatus,
    coverImageUrls: payload.coverImageUrls ?? []
  }

  // Enforce max 25 (frontend-level mirror; backend will enforce too)
  if (allBooks.value.length >= 25) {
    // For now, just close modal + console. Next step: show a toast/banner.
    console.warn('Maximum of 25 books reached.')
    addOpen.value = false
    return
  }

  allBooks.value = [newBook, ...allBooks.value]
  addOpen.value = false

  // UX: go to first page so user sees the new item
  page.value = 1
}

// Derived list (search/sort/page)
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

  const sorted = [...items].sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
  )

  if (sortOrder.value === 'desc') sorted.reverse()
  return sorted
})

const total = computed<number>(() => filteredSorted.value.length)
const totalPages = computed<number>(() => Math.max(1, Math.ceil(total.value / pageSize)))

const pagedBooks = computed<Book[]>(() => {
  const start = (page.value - 1) * pageSize
  return filteredSorted.value.slice(start, start + pageSize)
})

watch([search, sortOrder, totalPages], () => {
  page.value = Math.min(page.value, totalPages.value)
  if (page.value < 1) page.value = 1
})

function prevPage(): void {
  page.value = Math.max(1, page.value - 1)
}
function nextPage(): void {
  page.value = Math.min(totalPages.value, page.value + 1)
}

// placeholders for later commits
function onView(id: string): void { console.info('View', id) }
function onEdit(id: string): void { console.info('Edit', id) }
function onDelete(id: string): void { console.info('Delete', id) }
</script>

<template>
  <div class="space-y-6">
    <BooksHeader @add="openAdd" />

    <BooksToolbar
      :search="search"
      :sort-order="sortOrder"
      @update:search="search = $event"
      @update:sort-order="sortOrder = $event"
    />

    <BooksList
      :books="pagedBooks"
      @view="onView"
      @edit="onEdit"
      @delete="onDelete"
    />

    <div class="flex items-center justify-between text-sm text-slate-600">
      <div>
        Showing <span class="font-medium">{{ pagedBooks.length }}</span> of
        <span class="font-medium">{{ total }}</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded border bg-white hover:bg-slate-50 disabled:opacity-50"
          :disabled="page === 1"
          @click="prevPage"
        >
          Prev
        </button>

        <div class="px-2">
          Page <span class="font-medium">{{ page }}</span> of
          <span class="font-medium">{{ totalPages }}</span>
        </div>

        <button
          type="button"
          class="px-3 py-1.5 rounded border bg-white hover:bg-slate-50 disabled:opacity-50"
          :disabled="page === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Add Modal -->
    <AddBookModal
      :open="addOpen"
      @close="closeAdd"
      @save="onAddSave"
    />
  </div>
</template>
