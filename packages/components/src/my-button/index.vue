<template>
    <div class="ok">
        <button class="ok" :disabled="disabled">
            my-button
        </button>
        <button class="ok">
            your-button
        </button>
    </div>
</template>

<script setup lang="ts">
import type { MyButtonEmits, MyButtonProps } from './type'

defineOptions({
    name: 'MyButton',
})

const props = withDefaults(defineProps<MyButtonProps>(), {
    disabled: false,
    modelValue: '',
})

const emit = defineEmits<MyButtonEmits>()

defineExpose({
    getValue: () => {
        return 'my-button'
    },
})
</script>
