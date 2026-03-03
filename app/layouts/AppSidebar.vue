<template>
  <aside class="w-64 bg-blue-700 text-white min-h-screen p-4">
    <div class="text-xl font-bold mb-8">
      BookHub
    </div>

    <nav class="space-y-2">
      <NuxtLink
        class="block px-3 py-2 rounded hover:bg-blue-600"
        to="/books"
      >My Books</NuxtLink>
      <NuxtLink
        class="block px-3 py-2 rounded hover:bg-blue-600"
        to="/analytics"
      >Analytics</NuxtLink>
      <NuxtLink
        class="block px-3 py-2 rounded hover:bg-blue-600"
        to="/settings"
      >Settings</NuxtLink>
    </nav>
  </aside>
</template>
