<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title: string
  closeOnBackdrop?: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

function onBackdropClick() {
  if (props.closeOnBackdrop ?? true) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50"
    >
      <div
        class="absolute inset-0 bg-black/40"
        @click="onBackdropClick"
      />

      <div class="relative h-full w-full flex items-center justify-center p-4">
        <div class="w-full max-w-lg rounded-xl bg-white shadow-lg border overflow-hidden">
          <div class="px-5 py-4 border-b flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-900">
              {{ title }}
            </h2>
            <button
              class="text-slate-500 hover:text-slate-700"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="p-5">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="px-5 py-4 border-t bg-slate-50"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
