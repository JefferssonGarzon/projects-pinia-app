import { useProjectsStore } from '@/modules/projects/store/useProjects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fakeProjects } from '../../../../mocks/projects.fake';

describe('<ProjectsView>', () => {
  const wrapper = mount(ProjectsView, {
    global: {
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
      projects: fakeProjects,
    });
  });

  test('should be render with projects', () => {
    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(3);

    tableRows.forEach((row, index) => {
      const project = fakeProjects[index]!;
      const cells = row.findAll('td');
      expect(cells[0]?.text()).toBe(project.name);
      expect(cells[1]?.text()).toBe(project.tasks.length.toString());
    });
  });

  test('should call addProject method on modal', () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newProjectName = 'New Project';

    inputModal.vm.$emit('value', newProjectName);
    expect(store.addProject).toHaveBeenCalled();
    expect(store.addProject).toHaveBeenCalledWith(newProjectName);
  });
});
