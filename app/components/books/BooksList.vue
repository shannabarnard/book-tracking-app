<script setup lang="ts">
import BookListItem from './BookListItem.vue'

const books = [] // temporary static placeholder
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border divide-y">
    <div
      v-if="books.length === 0"
      class="p-8 text-center text-slate-500"
    >
      No books yet. Click “Add Book” to get started.
    </div>

    <BookListItem
      v-for="book in books"
      :key="book.id"
      :book="book"
    />
  </div>
</template>
