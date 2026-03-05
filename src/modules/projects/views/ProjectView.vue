<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? 'No name'"></BreadCrumbs>
    </section>
    <section>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in project?.tasks" :key="task.id" class="hover:bg-base-300">
              <td>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectsStore.toogleTask(project?.id ?? '', task.id)"
                />
              </td>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>

            <tr class="hover:bg-base-300">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="Nueva tarea"
                  v-model="taskInput"
                  @keyup.enter="addTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Project } from '../interfaces/project.interface';
import { useProjectsStore } from '../store/useProjects.store';

interface Props {
  id: string;
}

const props = defineProps<Props>();
const projectsStore = useProjectsStore();
const project = ref<Project | null>();
const router = useRouter();

const taskInput = ref('');

const addTask = () => {
  if (!project.value) return;
  projectsStore.addTaskToProject(project.value.id, taskInput.value);
  taskInput.value = '';
};

watch(
  () => props.id,
  () => {
    project.value = projectsStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      router.replace('/');
    }
  },
  {
    immediate: true,
  },
);
</script>
