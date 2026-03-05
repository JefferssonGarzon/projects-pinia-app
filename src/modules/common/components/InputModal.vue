<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title ?? 'Modal' }}</h3>
      <p class="py-4">{{ subTitle ?? 'Modal de creación' }}</p>
      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder ?? 'Ingrese un valor'"
            class="input input-bordered input-primary w-full flex-1"
            v-model="inputValue"
          />
          <!-- if there is a button in form, it will close the modal -->
          <div class="flex justify-end mt-5">
            <button @click="$emit('close')" type="button" class="btn mr-4">Close</button>
            <button type="submit" class="btn btn-primary">
              {{ isEdit ? 'Accept' : 'Update' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

interface Props {
  open: boolean;
  isEdit: boolean;
  title: string;
  subTitle?: string;
  placeholder?: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watch(props, async ({ open }) => {
  if (open) {
    await nextTick();
    inputRef.value?.focus();
  }
});

const submitValue = () => {
  if (!inputValue.value) {
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};

const fnPrueba = () => {
  const stringValue = 'aaaabbbcca';

  const array = stringValue.split('');
  let charCompare = '';
  let charCount = 0;
  const resultArray: { char: string; count: number }[] = [];

  array.forEach((character, index) => {
    if (!charCompare) charCompare = character;

    if (charCompare !== character) {
      resultArray.push({ char: charCompare, count: charCount });
      charCompare = character;
      charCount = 0;
      if (index + 1 === array.length) {
        charCount++;
        resultArray.push({ char: charCompare, count: charCount });
      }
    }

    charCount++;
  });

  console.log(resultArray);
};

fnPrueba();
</script>
