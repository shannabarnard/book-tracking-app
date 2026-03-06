<script setup lang='ts'>
import type { Book } from '@/types/book'
import BookListItem from './BookListItem.vue'

const props = withDefaults(
  defineProps<{
    books: ReadonlyArray<Book>
    pageSize?: number
  }>(),
  {
    pageSize: 5
  }
)

const emit = defineEmits<{
  (event: 'view' | 'edit' | 'delete', id: string): void
}>()

const page = ref(1)

const totalPages = computed(() => {
  const count = props.books.length
  const size = Math.max(1, props.pageSize)
  return Math.max(1, Math.ceil(count / size))
})

watch(
  () => [props.books.length, props.pageSize],
  () => {
    if (page.value > totalPages.value) page.value = totalPages.value
    if (page.value < 1) page.value = 1
  },
  { immediate: true }
)

const pagedBooks = computed(() => {
  const size = Math.max(1, props.pageSize)
  const start = (page.value - 1) * size
  return props.books.slice(start, start + size)
})

const canPrev = computed(() => page.value > 1)
const canNext = computed(() => page.value < totalPages.value)

const prevPage = () => {
  if (!canPrev.value) return
  page.value -= 1
}

const nextPage = () => {
  if (!canNext.value) return
  page.value += 1
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-200 overflow-hidden">
    <div
      v-if="books.length === 0"
      class="p-8 text-center text-slate-500"
    >
      No books yet. Click ‘Add Book’ to get started.
    </div>

    <BookListItem
      v-for="book in pagedBooks"
      :key="book.id"
      :book="book"
      @view="(id) => emit('view', id)"
      @edit="(id) => emit('edit', id)"
      @delete="(id) => emit('delete', id)"
    />

    <div
      v-if="books.length > 0 && totalPages > 1"
      class="flex items-center justify-between px-4 py-3 border-t border-slate-200"
    >
      <div class="text-sm text-slate-600">
        Page {{ page }} of {{ totalPages }}
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
          :disabled="!canPrev"
          @click="prevPage"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="size-4"
          />
          Prev
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white"
          :disabled="!canNext"
          @click="nextPage"
        >
          Next
          <UIcon
            name="i-lucide-chevron-right"
            class="size-4"
          />
        </button>
      </div>
    </div>
  </div>
</template>
