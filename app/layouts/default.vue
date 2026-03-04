<script setup lang="ts">
import AppSidebar from '~/layouts/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex">
    <AppSidebar />

    <main class="flex-1 min-w-0">
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
        <div class="text-sm text-slate-600">
          BookHub
        </div>

        <div class="text-sm text-slate-500">
          Nuxt 4 • Tailwind
        </div>
      </header>

      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
