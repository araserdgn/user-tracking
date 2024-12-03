<script setup lang="ts">
// import { useRouter } from "vue-router";
import {useMasterSettings} from "@/store/master/settings";
const settings=useMasterSettings();

const closeMobileSidebar = () => {
  if (window.innerWidth <= 768) {
    settings.openSidebar = false;
  }
}
const id=localStorage.getItem('userId');
// const router = useRouter();
// const navigateAndCloseSidebar = (path: string) => {
//   router.push(path);
//   closeMobileSidebar();
// }
</script>

<template>
  <div class="flex flex-col space-y-[4px] justify-between">
    <router-link to="/home" v-if="!id"
                 active-class="active-menu-link"
                 @click="closeMobileSidebar"
                 class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-6 h-6 mr-2 fill-current">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
      Users
    </router-link>
    <router-link :to="`/users/${id}`" v-if="id"
                 active-class="active-menu-link"
                 @click="closeMobileSidebar"
                 class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-6 h-6 mr-2 fill-current">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
      Todos
    </router-link>
    <router-link :to="`/users-post/${id}`" v-if="id"
                 active-class="active-menu-link"
                 @click="closeMobileSidebar"
                 class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-6 h-6 mr-2 fill-current">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
      Post
    </router-link>
    <router-link to="/albums" v-if="id"
                 active-class="active-menu-link"
                 @click="closeMobileSidebar"
                 class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="w-6 h-6 mr-2 fill-current">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
     Albums
    </router-link>
  </div>
</template>

<style scoped>
.active-menu-link {
  background-color:white;
  color:black;
}
</style>
