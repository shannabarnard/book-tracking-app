<script setup lang="ts">
import type { SortOrder } from '~/types/book'

const props = defineProps<{
  search: string
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'update:sortOrder', value: SortOrder): void
}>()

function onSearchInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:search', value)
}

function onSortChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value as SortOrder
  emit('update:sortOrder', value)
}
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
    <!-- Search -->
    <div class="relative w-full md:max-w-md">
      <input
        :value="search"
        type="text"
        placeholder="Search by title or author..."
        class="w-full bg-white text-slate-500 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="onSearchInput"
      >
    </div>

    <!-- Sort -->
    <div>
      <select
        :value="sortOrder"
        class="border bg-white text-slate-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @change="onSortChange"
      >
        <option value="asc">
          Sort by Title (A–Z)
        </option>
        <option value="desc">
          Sort by Title (Z–A)
        </option>
      </select>
    </div>
  </div>
</template>
