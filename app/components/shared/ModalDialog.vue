<script setup lang='ts'>
import { onBeforeUnmount, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    open: boolean
    title: string
    closeOnBackdrop?: boolean
  }>(),
  {
    closeOnBackdrop: true
  }
)

const emit = defineEmits<{
  (event: 'close'): void
}>()

const close = () => emit('close')

const onKeydown = (event: KeyboardEvent) => {
  if (!props.open) return
  if (event.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

const onBackdropClick = () => {
  if (props.closeOnBackdrop) close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="absolute inset-0 bg-black/40"
        @click="onBackdropClick"
      />

      <div class="relative flex h-full w-full items-center justify-center p-4">
        <div class="flex w-full max-w-lg max-h-[90vh] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 flex-shrink-0">
            <h2 class="text-lg font-semibold text-slate-900">
              {{ title }}
            </h2>

            <button
              type="button"
              class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              aria-label="Close modal"
              @click="close"
            >
              <UIcon
                name="i-lucide-x"
                class="size-4"
              />
            </button>
          </div>

          <div class="p-5 overflow-y-auto">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="border-t border-slate-200 bg-slate-50 px-5 py-4 flex-shrink-0"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
