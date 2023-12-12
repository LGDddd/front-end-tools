import type Comp from './index.vue'

export interface MyTreeOptionsItemProps {
    label: string
    children?: MyTreeOptionsItemProps[]
}

// 定义props类型
export interface MyTreeProps {
    options: MyTreeOptionsItemProps[]
}

// 定义emit类型
export interface MyTreeEmits {}

// 定义instance类型
export type MyTreeInstance = InstanceType<typeof Comp>
