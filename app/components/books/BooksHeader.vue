<script setup lang="ts">
const emit = defineEmits<{
  (event: 'add'): void
}>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border p-6 flex justify-between items-start">
    <div>
      <h1 class="text-2xl font-semibold text-slate-900">
        My Books
      </h1>
      <p class="text-slate-600 mt-1">
        Manage your books, track ratings, and add personal notes.
      </p>
    </div>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      @click="emit('add')"
    >
      + Add Book
    </button>
  </div>
</template>
