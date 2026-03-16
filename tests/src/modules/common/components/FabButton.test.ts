import { describe, expect, test } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import FabButton from '@/modules/common/components/FabButton.vue';

describe('<FabButton>', () => {
  test('renders with default position', () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.props().position).toBe('bottom-right');

    const buttomClasses = wrapper.find('button').classes();
    const classesToHave = ['btn', 'btn-accent', 'fixed', 'bottom-right', 'btn-circle'];

    buttomClasses.forEach((btnClass) => {
      expect(classesToHave).toContain(btnClass);
    });
  });

  test('renders with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    });

    const buttom = wrapper.find('button');

    expect(buttom.classes()).toContain('top-left');
  });

  test('renders with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-right',
      },
    });

    const buttom = wrapper.find('button');

    expect(buttom.classes()).toContain('top-right');
  });

  test('renders with bottom-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'bottom-left',
      },
    });

    const buttom = wrapper.find('button');

    expect(buttom.classes()).toContain('bottom-left');
  });

  test('renders with bottom-right position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'bottom-right',
      },
    });

    const buttom = wrapper.find('button');

    expect(buttom.classes()).toContain('bottom-right');
  });

  test('renders slot content inside buttom', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hi Jeff!</span>',
      },
    });

    const slotContent = wrapper.find('button span');
    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('Hi Jeff!');
  });
});
