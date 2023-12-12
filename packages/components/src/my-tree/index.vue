<template>
    <li v-for="(item, index) in options" :key="index" class="list-item">
        <div @click="onShow(index)">
            <span>{{ item.label }}</span>
        </div>
        <ul v-show="isIn(index)">
            <MyTree v-if="item.children && item.children.length" :options="item.children" />
        </ul>
    </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { MyTreeProps } from './type'

// eslint-disable-next-line import/no-self-import
import MyTree from './index.vue'

defineOptions({
    name: 'MyTree',
})

const props = withDefaults(defineProps<MyTreeProps>(), {
    options: () => [
        {
            label: 'public',
            children: [
                {
                    label: 'env.js',
                },
                {
                    label: 'hell0.js',
                },
            ],
        },
        {
            label: 'src',
            children: [
                {
                    label: 'assets',
                    children: [
                        {
                            label: 'font',
                        },
                        {
                            label: 'css',
                        },
                    ],
                },
                {
                    label: 'view',
                    children: [
                        {
                            label: 'page1',
                        },
                        {
                            label: 'page2',
                        },
                    ],
                },
            ],
        },
    ],
})

const isShowKey = ref<number[]>([])
const isIn = (key: number) => isShowKey.value.findIndex(c => c === key) > -1

const onShow = (key: number) => {
    if (!props.options[key].children) {
        return
    }
    const index = isShowKey.value.findIndex(c => c === key)
    if (index > -1) {
        isShowKey.value.splice(index, 1)
    }
    else {
        isShowKey.value.push(key)
    }
}
</script>
