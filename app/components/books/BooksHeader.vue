<script setup lang="ts">
const emit = defineEmits<{
  (event: 'add'): void
}>()
</script>

<template>
  <div class="flex items-start justify-between">
    <div>
      <h1 class="text-[34px] font-extrabold text-slate-900 leading-[1.05]">
        My Books
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Manage your book collection and discover new reads.
      </p>
    </div>

    <button
      type="button"
      class="h-10 px-4 rounded-lg bg-[#6e63ff] text-white text-sm font-semibold shadow-sm hover:bg-[#5d53ff] transition
             inline-flex items-center gap-2"
      @click="emit('add')"
    >
      <span class="text-lg leading-none">+</span>
      Add Book
    </button>
  </div>
</template>
