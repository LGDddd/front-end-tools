<template>
    <div class="input">
        <ElInput v-model="inputValue" />
        <span>this is my input</span>
    </div>
</template>

<script setup lang="ts">
import { useModel } from 'vue'
import { ElInput } from 'element-plus'
import type { MyInputEmits, MyInputProps } from './type'

defineOptions({
    name: 'MyInput',
})

const props = withDefaults(defineProps<MyInputProps>(), {
    modelValue: '',
})

defineEmits<MyInputEmits>()

const inputValue = useModel(props, 'modelValue')

defineExpose({
    getValue: () => {
        return inputValue.value
    },
})
</script>
