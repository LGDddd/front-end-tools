import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Comp from '../index.vue'

describe('my-button', () => {
    it('renders properly', () => {
        const wrapper = mount(Comp)
        expect(wrapper.text()).toContain('my-button')
    })
})
