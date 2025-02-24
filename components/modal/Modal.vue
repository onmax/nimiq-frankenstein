<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue'
import { onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = withDefaults(defineProps<{ name: ModalName, nested?: boolean }>(), { nested: false })
const emit = defineEmits<{ close: [] }>()
const open = defineModel<boolean>('open')

// Keep state in the URL
const route = useRoute()
const router = useRouter()
const queryName = props.nested ? 'nested' : 'modal'
open.value = route.query[queryName] === props.name
watch(open, (v) => {
  requestAnimationFrame(() => router.replace({ query: { ...route.query, [queryName]: v ? props.name : undefined } }))
  if (!v)
    emit('close')
})
onUnmounted(() => router.replace({ query: { ...route.query, [queryName]: undefined } }))
</script>

<script lang="ts">
export enum ModalName {
  MyAwesomeModal = 'my-awesome-modal',
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger v-bind="$attrs">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <Transition name="backdrop">
        <DialogOverlay v-if="!nested" fixed inset-0 z-200 bg-darkblue op-60 />
      </Transition>
      <Transition :name="nested ? 'nested' : 'modal'">
        <DialogContent
          :key="name" desktop="top-1/2 left-1/2 translate--1/2" rounded="t-8 desktop:8"
          data-modal desktop:max-w-500 fixed bottom-0 z-200 h-max max-h-85dvh w-full transform of-y-auto shadow-lg outline-none
          :data-nested="nested ? '' : undefined" @open-auto-focus.prevent
        >
          <div relative bg-neutral-0 py-32 ring="1.5 neutral/3" class="modal-container">
            <DialogTitle text="24 center neutral lh-24" desktop:px-40 mb-12 px-24 font-bold lh-none as="h2">
              <slot name="title" />
            </DialogTitle>
            <DialogDescription text="center neutral" desktop:px-40 block px-24>
              <slot name="description" />
            </DialogDescription>

            <div desktop:px-40 mt-12 px-24>
              <slot name="content" />
            </div>

            <!-- :aria-label="$t('Close')" -->
            <DialogClose aria-label="Close" close-btn absolute right-16 top-16 text-28 />
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* https://github.com/nimiq/wallet/blob/a88d34bfa16930adbfd52baaa5b0809c38c5c365/src/components/modals/Modal.vue */

.backdrop-enter-active {
  transition: opacity 650ms cubic-bezier(0.3, 1, 0.2, 1);
}

.backdrop-leave-active {
  transition: opacity 650ms cubic-bezier(0.3, 0, 0, 1);
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

@screen lt-desktop {
  .modal-enter-active,
  .modal-leave-active {
    transition: transform 200ms ease-out;
  }

  .modal-enter-from,
  .modal-leave-to {
    --un-translate-y: 100%;
  }
}

@screen desktop {
  .modal-enter-active,
  .modal-leave-active {
    transition:
      opacity 250ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 100ms var(--nq-ease);
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    --un-scale-x: 0.96;
    --un-scale-y: 0.96;
    --un-translate-y: calc(-50% - 0.5rem);
  }
}

/*
Radix will set all the modals in the root of the body. So we check if a sibling contains [data-nested]
Only apply when the Vue Transition classes are not applied
*/
[data-modal]:not([data-nested]):not([class*='modal-']) {
  transition:
    transform 400ms ease-out,
    filter 450ms cubic-bezier(0.3, 0, 0, 1);

  &:has(~ [data-nested][data-state='open']) {
    --un-scale-x: 0.94;
    --un-scale-y: 0.94;
    filter: brightness(0.8) blur(0.5px);
  }
}

@screen desktop {
  .nested-enter-active {
    transition: transform 650ms cubic-bezier(0.3, 1, 0.2, 1);
  }

  .nested-leave-active {
    transition: transform 450ms cubic-bezier(0.3, 0, 0, 1);
  }

  .nested-enter-from,
  .nested-leave-to {
    --un-translate-y: calc(-1.1 * (100vh / 2) - 100%);
  }
}

@screen lt-desktop {
  .nested-enter-active {
    transition: transform 350ms cubic-bezier(0.3, 1, 0.2, 1);
  }

  .nested-leave-active {
    transition: transform 250ms cubic-bezier(0.3, 0, 0, 1);
  }

  .nested-enter-from,
  .nested-leave-to {
    --un-translate-y: 100%;
  }
}
</style>
