<script setup lang="ts">
import ModalShell from '~/components/shared/ModalDialog.vue'
import type { CreateBookRequest, NoteStatus } from '~/types/book'
import { hasErrors, validateCreateBook } from '~/utils/validation'

const props = defineProps<{ open: boolean }>()
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

function submit() {
  const e = validateCreateBook(form)
  Object.assign(errors, e)

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

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) return
    // reset when opened (optional)
    form.title = ''
    form.author = ''
    form.isbn = ''
    form.rating = undefined
    form.comments = ''
    form.noteStatus = 'ToRead'
    form.coverImageUrls = []
    Object.keys(errors).forEach(k => (errors[k] = undefined))
  }
)
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
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
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
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
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
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
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
          rows="4"
          class="mt-1 w-full border rounded-lg px-3 py-2 text-slate-500"
        />
        <p
          v-if="errors.comments"
          class="mt-1 text-sm text-red-600"
        >
          {{ errors.comments }}
        </p>
      </div>
    </form>

    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg border bg-white text-slate-500 hover:bg-slate-150"
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
