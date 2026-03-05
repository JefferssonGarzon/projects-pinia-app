import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));
  const isEditProject = ref(false);

  const addProject = (projectName: string) => {
    if (projectName.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: [],
    });
  };

  const editProjectName = (projectId: string, projectName: string) => {
    const project = projects.value.find((project) => project.id === projectId);

    if (!project) return;

    project.name = projectName;
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.length === 0) return;

    const index = projects.value.findIndex((project) => project.id === projectId);
    if (index !== -1) {
      projects.value[index]?.tasks.push({
        id: uuidv4(),
        name: taskName,
      });
    }
  };

  const toogleTask = (projectId: string, taskId: string) => {
    const project = projects.value.find((project) => project.id === projectId);
    if (!project) return;

    const task = project.tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    // Properties
    projects,
    isEditProject,

    // Getters
    projectList: computed(() => [...projects.value]),
    emptyProjects: computed(() => projects.value.length === 0),
    completedProjects: computed(() => {
      return projects.value.map((project) => {
        const total = project.tasks.length;
        const completedTasks = project.tasks.filter((task) => !!task.completedAt).length;

        return {
          id: project.id,
          name: project.name,
          taskCount: total,
          completePercent: total === 0 ? 0 : Math.round((completedTasks / total) * 100),
        };
      });
    }),

    // Methods
    addProject,
    addTaskToProject,
    toogleTask,
    editProjectName,
  };
});
