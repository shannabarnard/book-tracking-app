<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from '~/layouts/AppSidebar.vue'

const route = useRoute()

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

watch(() => route.fullPath, () => {
  isSidebarOpen.value = false
})
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <div
      class="lg:hidden"
      :class="isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <div
        class="fixed inset-0 z-40 bg-slate-900/40 transition-opacity"
        :class="isSidebarOpen ? 'opacity-100' : 'opacity-0'"
        @click="closeSidebar"
      />

      <div
        class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform"
        :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <AppSidebar />
      </div>
    </div>

    <div class="flex min-h-screen">
      <div class="hidden lg:block">
        <AppSidebar />
      </div>

      <main class="flex-1 min-w-0">
        <header class="h-16 flex items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div class="flex items-center gap-3 min-w-0">
            <button
              type="button"
              class="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-slate-100 active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open menu"
              @click="toggleSidebar"
            >
              <span class="sr-only">Toggle menu</span>
              <UIcon
                name="i-lucide-menu"
                class="size-5 text-slate-700"
              />
            </button>

            <div class="truncate text-sm font-medium text-slate-600">
              BookHub
            </div>
          </div>

          <div class="hidden sm:block text-sm text-slate-500">
            Nuxt 4 • Tailwind
          </div>
        </header>

        <div class="p-4 sm:p-6 lg:p-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
