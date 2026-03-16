import { useProjectsStore } from '@/modules/projects/store/useProjects.store';
import ProjectView from '@/modules/projects/views/ProjectView.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { fakeProjects } from '../../../../mocks/projects.fake';
import { useRouter } from 'vue-router';

vi.mock('@/modules/projects/store/useProjects.store');
vi.mock('vue-router');

describe('<ProjectView>', () => {
  test('should be render with a project', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: fakeProjects,
    });

    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    const tableRows = wrapper.findAll('tr.hover\\:bg-base-300');
    expect(tableRows.length).toBe(fakeProjects[0]?.tasks.length);
  });

  test('should redirect to project if projectId not found', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: [],
    });

    const replaceSpy = vi.fn();
    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    });

    mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/');
  });
});
