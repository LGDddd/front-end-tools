import type Comp from './index.vue'

// 定义props类型
export interface MyButtonProps {
    modelValue?: string
    disabled?: boolean
}

// 定义emit类型
export interface MyButtonEmits {
    (e: 'update:modelValue', data: string): void
}

// 定义instance类型
export type MyButtonInstance = InstanceType<typeof Comp>
