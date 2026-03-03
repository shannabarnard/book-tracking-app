<!-- pages/books.vue -->
<script setup lang="ts">
import type { Book } from '~/types/book'
import BooksList from '~/components/books/BooksList.vue'

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
</script>

<template>
  <div class="space-y-6">
    <BooksList
      :books="allBooks"
    />
  </div>
</template>
