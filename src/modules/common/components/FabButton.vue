<template>
  <button @click="$emit('click')" :class="['btn btn-accent fixed', position, roundShape]">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  roundShape?: 'btn-circle' | null;
}

withDefaults(defineProps<Props>(), {
  position: 'bottom-right',
  roundShape: 'btn-circle',
});

defineEmits(['click']);
</script>

<style scoped>
@import 'tailwindcss';

.top-left {
  @apply top-10 left-10;
}

.top-right {
  @apply top-10 right-10;
}

.bottom-left {
  @apply bottom-10 left-10;
}

.bottom-right {
  @apply bottom-10 right-10;
}

.btn-circle {
  @layer daisyui.l1.l2 {
    border-radius: calc(infinity * 1px);
    padding-inline: calc(0.25rem /* 4px */ * 0) /* 0rem = 0px */;
    width: var(--size);
    height: var(--size);
  }
}
</style>
