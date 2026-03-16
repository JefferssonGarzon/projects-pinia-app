import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { useProjectsStore } from '@/modules/projects/store/useProjects.store';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fakeProjects } from '../../../../mocks/projects.fake';
import { nextTick } from 'vue';

describe('<SideMenu>', () => {
  const wrapper = mount(SideMenu, {
    global: {
      stubs: ['RouterLink'],
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
        }),
      ],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: [],
    });
  });

  test('should render with no projects', () => {
    expect(wrapper.html()).toContain('No hay proyectos');
  });

  test('should render with projects', async () => {
    store.$patch({
      projects: fakeProjects,
    });

    await nextTick();

    expect(wrapper.html()).not.toContain('No hay proyectos');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
