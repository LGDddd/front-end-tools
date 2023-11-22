<template>
    <MyButton ref="ok" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MyButton, type MyButtonInstance } from '@lgd/components'

const ok = ref<MyButtonInstance>()

onMounted(() => {
    // console.log(ok.value?.getValue())
})
</script>
