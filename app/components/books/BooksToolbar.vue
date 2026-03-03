<template>
  <div class="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
    <!-- Search -->
    <div class="relative w-full md:max-w-md">
      <input
        type="text"
        placeholder="Search by title or author..."
        class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
    </div>

    <!-- Sort -->
    <div>
      <select
        class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
