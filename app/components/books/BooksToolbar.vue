<script setup lang="ts">
import type { SortOrder } from '~/types/book'

const props = defineProps<{
  search: string
  sortOrder: SortOrder
}>()

const emit = defineEmits<{
  (event: 'update:search', value: string): void
  (event: 'update:sortOrder', value: SortOrder): void
}>()

function onSearchInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:search', value)
}

function onSortChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value as SortOrder
  emit('update:sortOrder', value)
}
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- Search -->
    <div class="relative flex-1">
      <UIcon
        name="i-heroicons-magnifying-glass"
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
      />

      <input
        :value="search"
        type="text"
        placeholder="Search by title or author..."
        class="w-full h-10 pl-10 pr-3 rounded-lg border border-slate-200 bg-white text-sm
               placeholder:text-slate-400
               focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
        @input="onSearchInput"
      >
    </div>

    <!-- Sort -->
    <select
      :value="sortOrder"
      class="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700
             focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
      @change="onSortChange"
    >
      <option value="asc">
        Sort by Title
      </option>
      <option value="desc">
        Sort by Title (Z–A)
      </option>
    </select>

    <!-- View Toggle -->
    <div class="flex h-10 rounded-lg border border-slate-200 bg-white overflow-hidden">
      <!-- Grid -->
      <button
        type="button"
        class="w-10 grid place-items-center text-slate-500 hover:bg-slate-50"
      >
        <UIcon
          name="i-heroicons-squares-2x2"
          class="w-4 h-4"
        />
      </button>

      <!-- List (active) -->
      <button
        type="button"
        class="w-10 grid place-items-center bg-[#6e63ff] text-white"
      >
        <UIcon
          name="i-heroicons-bars-3-bottom-left"
          class="w-4 h-4"
        />
      </button>
    </div>
  </div>
</template>
