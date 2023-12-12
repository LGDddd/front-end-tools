import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Comp from '../index.vue'

describe('my-tree', () => {
    it('renders properly', () => {
        const wrapper = mount(Comp)
        const liOne = wrapper.text()
        expect(wrapper.text()).toContain('')
    })
})
