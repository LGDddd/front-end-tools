<template>
    <MyButton />
    <MyInput v-model="v" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const v = ref('2')
onMounted(() => {
})
</script>
