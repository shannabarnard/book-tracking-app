<script setup lang="ts">
import ModalShell from '~/components/shared/ModalDialog.vue'
import type { CreateBookRequest, NoteStatus } from '~/types/book'
import { hasErrors, validateCreateBook, LIMITS } from '~/utils/validation'

defineProps<{ open: boolean }>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'save', payload: CreateBookRequest): void
}>()

const form = reactive<CreateBookRequest>({
  title: '',
  author: '',
  isbn: '',
  rating: undefined,
  comments: '',
  noteStatus: 'ToRead',
  coverImageUrls: []
})

const errors = reactive<Record<string, string | undefined>>({})

const noteStatusOptions: NoteStatus[] = ['ToRead', 'Reading', 'Read', 'Abandoned']

function validateAndSetErrors() {
  const e = validateCreateBook(form)
  Object.assign(errors, e)
  return e
}

function clearFieldError(field: keyof typeof errors) {
  errors[field] = undefined
}

function submit() {
  const e = validateAndSetErrors()
  if (!hasErrors(e)) {
    emit('save', {
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      comments: (form.comments ?? '').trim()
    })
  }
}
</script>

<template>
  <ModalShell
    :open="open"
    title="Add Book"
    @close="emit('close')"
  >
    <form
      class="space-y-4"
      @submit.prevent="submit"
    >
      <div>
        <label class="block text-sm font-medium text-slate-700">Title</label>
        <input
          v-model="form.title"
          :maxlength="LIMITS.titleMax"
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
          @input="clearFieldError('title')"
        >
        <p
          v-if="errors.title"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.title }}
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700">Author</label>
        <input
          v-model="form.author"
          :maxlength="LIMITS.authorMax"
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
          @input="clearFieldError('author')"
        >
        <p
          v-if="errors.author"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.author }}
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700">ISBN</label>
        <input
          v-model="form.isbn"
          :maxlength="LIMITS.isbnMax"
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
          @input="clearFieldError('isbn')"
        >
        <p
          v-if="errors.isbn"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.isbn }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-slate-700">Note status</label>
          <select
            v-model="form.noteStatus"
            class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
          >
            <option
              v-for="s in noteStatusOptions"
              :key="s"
              :value="s"
            >
              {{ s }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700">Rating (1–5)</label>
          <input
            v-model.number="form.rating"
            type="number"
            min="1"
            max="5"
            class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
            @input="clearFieldError('rating')"
          >
          <p
            v-if="errors.rating"
            class="mt-1 text-sm text-red-600"
          >
            {{ errors.rating }}
          </p>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-slate-700">Comments</label>
        <textarea
          v-model="form.comments"
          :maxlength="LIMITS.commentsMax"
          rows="4"
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
          @input="clearFieldError('comments')"
        />
        <p
          v-if="errors.comments"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.comments }}
        </p>
        <p class="mt-1 text-xs text-slate-500">
          {{ (form.comments ?? '').length }} / {{ LIMITS.commentsMax }}
        </p>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </template>
  </ModalShell>
</template>
