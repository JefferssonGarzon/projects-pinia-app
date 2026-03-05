<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Project</th>
          <th>Tasks</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 2 -->
        <tr
          v-for="(project, index) in projectsStore.completedProjects"
          :key="project.id"
          class="hover:bg-base-300"
        >
          <th>{{ index + 1 }}</th>
          <td
            @dblclick="
              isEditModal = true;
              modalOpen = true;
              projectIdByEdit = project.id;
            "
            class="cursor-pointer"
          >
            {{ project.name }}
          </td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completePercent"
              max="100"
            ></progress>
            {{ project.completePercent }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <InputModal
    :open="modalOpen"
    :is-edit="isEditModal"
    @close="modalOpen = false"
    @value="
      !isEditModal
        ? projectsStore.addProject($event)
        : projectsStore.editProjectName(projectIdByEdit, $event)
    "
    placeholder="Ingrese el nombre del proyecto"
    :title="!isEditModal ? 'Crear proyecto' : 'Editar proyecto'"
    :sub-title="
      !isEditModal ? 'Modal para creación de proyectos' : 'Modal para modificar nombre de proyecto'
    "
  ></InputModal>

  <CustomModal :open="customModalOpen">
    <template #header>
      <h1 class="font-bold">Modal Title</h1>
    </template>
    <template #body>
      <h2>This is the body of the modal that uses named slots</h2>
    </template>
    <template #footer>
      <div class="flex justify-end mt-5">
        <button @click="customModalOpen = false" type="button" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn btn-primary">Accept</button>
      </div>
    </template>
  </CustomModal>

  <Fabbutton @click="modalOpen = true" :position="'bottom-right'" :round-shape="'btn-circle'">
    <AddCircle></AddCircle>
  </Fabbutton>

  <Fabbutton @click="customModalOpen = true" :position="'bottom-left'" :round-shape="'btn-circle'">
    <AddCube></AddCube>
  </Fabbutton>
</template>

<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import Fabbutton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import AddCube from '@/modules/common/icons/AddCube.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/useProjects.store';

const modalOpen = ref(false);
const isEditModal = ref(false);
const customModalOpen = ref(true);
const projectIdByEdit = ref('');

const projectsStore = useProjectsStore();
</script>
