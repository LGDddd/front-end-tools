<template>
    <MyButton />
    <MyInput v-model="v" />
    <ElButton>好的</ElButton>
</template>

<script setup lang="ts">
const v = ref('2')
</script>
