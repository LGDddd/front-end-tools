import type Comp from './index.vue'

// 定义props类型
export interface MyInputProps {
    modelValue?: string
}

// 定义emit类型
export interface MyInputEmits {
    (e: 'update:modelValue', data: string): void
}

// 定义instance类型
export type MyInputInstance = InstanceType<typeof Comp>
