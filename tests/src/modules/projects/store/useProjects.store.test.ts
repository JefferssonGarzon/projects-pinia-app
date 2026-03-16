import { useProjectsStore } from '@/modules/projects/store/useProjects.store';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';
import { fakeProjects } from '../../../../mocks/projects.fake';

describe('useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      projects,
      isEditProject,
      projectList,
      emptyProjects,
      completedProjects,
      addProject,
      addTaskToProject,
      toogleTask,
      editProjectName,
    } = useProjectsStore();

    expect(projects).toEqual([]);
    expect(isEditProject).toBe(false);

    expect(projectList).toEqual([]);
    expect(emptyProjects).toBe(true);
    expect(completedProjects).toEqual([]);

    expect(addProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(toogleTask).toBeInstanceOf(Function);
    expect(editProjectName).toBeInstanceOf(Function);
  });

  test('add a project - actions', () => {
    const store = useProjectsStore();

    const projectName = 'New Project';
    store.addProject(projectName);

    expect(store.projects.length).toBe(1);
    expect(store.projects[0]).toEqual({
      id: expect.any(String),
      name: projectName,
      tasks: [],
    });
  });

  test('should load from localstorage', () => {
    localStorage.setItem('projects', JSON.stringify(fakeProjects));

    const store = useProjectsStore();
    const [project1] = store.projects;

    expect(project1).toEqual({
      id: '1',
      name: 'project 1',
      tasks: expect.any(Array),
    });

    expect(store.projects.length).toBe(3);
  });

  test('add task to a project', () => {
    const store = useProjectsStore();
    const projectName = 'New project';
    store.addProject(projectName);
    const project = store.projects[0]!;
    const taskName = 'New Task';

    store.addTaskToProject(project.id, taskName);

    expect(project.tasks.length).toBe(1);
    expect(project.tasks[0]).toEqual({
      id: expect.any(String),
      name: taskName,
      completeAt: undefined,
    });
  });

  test('toogles a task', () => {
    const store = useProjectsStore();
    const projectName = 'New project';
    store.addProject(projectName);
    const project = store.projects[0]!;
    const taskName = 'New Task';

    store.addTaskToProject(project.id, taskName);

    const task = project.tasks[0]!;

    store.toogleTask(project.id, task.id);

    expect(task).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });
    expect(task.completedAt).toBeInstanceOf(Date);
  });

  test('should return the projects with completion', () => {
    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = fakeProjects;
    });

    expect(store.completedProjects).toEqual([
      { id: '1', name: 'project 1', taskCount: 4, completePercent: 25 },
      { id: '2', name: 'project 2', taskCount: 0, completePercent: 0 },
      { id: '3', name: 'project 3', taskCount: 2, completePercent: 50 },
    ]);
  });
});
