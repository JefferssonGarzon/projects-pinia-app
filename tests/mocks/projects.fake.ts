import type { Project } from '@/modules/projects/interfaces/project.interface';

export const fakeProjects: Project[] = [
  {
    id: '1',
    name: 'project 1',
    tasks: [
      { id: '1', name: 'task1', completedAt: new Date() },
      { id: '2', name: 'task2' },
      { id: '3', name: 'task3' },
      { id: '4', name: 'task4' },
    ],
  },
  {
    id: '2',
    name: 'project 2',
    tasks: [],
  },
  {
    id: '3',
    name: 'project 3',
    tasks: [
      { id: '1', name: 'task1' },
      { id: '2', name: 'task2', completedAt: new Date() },
    ],
  },
];
