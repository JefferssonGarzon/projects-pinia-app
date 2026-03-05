<template>
  <!-- Open the modal using ID.showModal() method -->
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <!-- Header -->
      <div class="border-b border-b-blue-500">
        <slot name="header"></slot>
      </div>

      <!-- Body -->
      <div class="my-5">
        <slot name="body"></slot>
      </div>

      <!-- <h3 class="text-lg font-bold">Hello!</h3>
      <p class="py-4">Press ESC key or click the button below to close</p> -->

      <div class="border-t border-b-blue-500">
        <!-- <form method="dialog">
          <button class="btn">Close</button>
        </form> -->
        <slot name="footer"></slot>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
