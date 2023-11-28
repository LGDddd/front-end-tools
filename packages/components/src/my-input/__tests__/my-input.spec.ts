import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Comp from '../index.vue'

describe('my-input', () => {
    it('renders properly', () => {
        const wrapper = mount(Comp, {
            modelValue: '2',
        })
        expect(wrapper.text()).toContain('')
    })
})
