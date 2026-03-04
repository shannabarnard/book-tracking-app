<script setup lang="ts">
import type { Book } from '~/types/book'

const props = defineProps<{
  book: Book
}>()

const emit = defineEmits<{
  (event: 'view' | 'edit' | 'delete', id: string): void
}>()

const coverUrl = computed(() => props.book.coverImageUrls?.[0] ?? null)

const stars = computed(() => {
  const rating = props.book.rating
  if (!rating) return ''
  const filled = '★'.repeat(rating)
  const empty = '☆'.repeat(5 - rating)
  return `${filled}${empty}`
})
</script>

<template>
  <div class="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
    <!-- Cover -->
    <div class="w-14 h-20 bg-slate-200 rounded flex-shrink-0 overflow-hidden">
      <img
        v-if="coverUrl"
        :src="coverUrl"
        :alt="`${book.title} cover`"
        class="w-full h-full object-cover"
      >
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="font-semibold text-slate-900 truncate">
        {{ book.title }}
      </div>
      <div class="text-sm text-slate-600 truncate">
        {{ book.author }}
      </div>

      <div class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
        <span>ISBN: {{ book.isbn }}</span>
      </div>
    </div>

    <!-- Rating -->
    <div class="text-yellow-500 text-sm whitespace-nowrap">
      <span v-if="book.rating">{{ stars }}</span>
      <span
        v-else
        class="text-slate-400"
      >—</span>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 text-sm whitespace-nowrap">
      <button
        type="button"
        class="text-blue-600 hover:underline"
        @click="emit('view', book.id)"
      >
        View
      </button>
      <button
        type="button"
        class="text-slate-600 hover:underline"
        @click="emit('edit', book.id)"
      >
        Edit
      </button>
      <button
        type="button"
        class="text-red-600 hover:underline"
        @click="emit('delete', book.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>
