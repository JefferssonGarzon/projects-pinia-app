<script setup lang="ts">
import TopMenu from '@/modules/common/components/TopMenu.vue';
import SideMenu from '../components/SideMenu.vue';
</script>

<template>
  <div class="flex flex-col">
    <!-- Top menu -->
    <TopMenu></TopMenu>
    <main class="flex flex-row">
      <!-- Side menu -->
      <SideMenu></SideMenu>

      <RouterView></RouterView>
    </main>
  </div>
</template>
