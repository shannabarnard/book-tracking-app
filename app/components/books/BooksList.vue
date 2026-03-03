<script setup lang="ts">
import type { Book } from '@/types/book'
import BookListItem from './BookListItem.vue'

defineProps<{
  books: ReadonlyArray<Book>
}>()

const emit = defineEmits<{
  (event: 'view' | 'edit' | 'delete', id: string): void
}>()
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
      @view="(id) => emit('view', id)"
      @edit="(id) => emit('edit', id)"
      @delete="(id) => emit('delete', id)"
    />
  </div>
</template>
