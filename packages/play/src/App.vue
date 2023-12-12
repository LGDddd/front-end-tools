<template>
    <MyButton />
    <MyInput v-model="v" />
    <ElButton>好的</ElButton>
    <ElInput />
    <MyTree />
</template>

<script setup lang="ts">
import { MyTree } from '@lgd_org/components/src/my-tree'
import '@lgd_org/components/src/my-tree/style/index.scss'

const v = ref('2')
</script>
