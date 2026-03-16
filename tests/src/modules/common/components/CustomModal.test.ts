import CustomModal from '@/modules/common/components/CustomModal.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

describe('<CustomModal>', () => {
  test('renders dialog with default state', () => {
    const wrapper = mount(CustomModal);

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeUndefined();
  });

  test('renders dialog with header, body and footer slots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<span>Header Content</span>',
        body: '<span>Body Content</span>',
        footer: '<span>Footer Content</span>',
      },
    });

    expect(wrapper.text()).toContain('Header Content');
    expect(wrapper.find('.my-5').text()).toContain('Body Content');
    expect(wrapper.text()).toContain('Footer Content');
  });

  test('opens and closes dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const modal = wrapper.find('dialog');
    expect(modal.attributes('open')).toBeDefined();

    await wrapper.setProps({ open: false });
    expect(modal.attributes('open')).toBeUndefined();
  });
});
