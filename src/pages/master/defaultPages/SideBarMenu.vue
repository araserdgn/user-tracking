<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

// Kullanıcı ID'sini LocalStorage'dan kontrol et
const userId = localStorage.getItem("userId");

// Sidebar'da gezinme
const navigate = (path: string) => {
  router.push(path);
};

// Kullanıcı seçimini temizleme
const clearUserData = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userUsername");
  navigate("/home"); // Kullanıcı sayfasına yönlendir
};
</script>

<template>
  <div class="flex flex-col space-y-[4px]">
    <!-- Users -->
    <router-link
      to="/home"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 fill-current">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Users
    </router-link>

    <!-- Todos -->
    <router-link
      v-if="userId"
      :to="`/users/${userId}`"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
      Todos
    </router-link>

    <!-- Posts -->
    <router-link
      v-if="userId"
      :to="`/users-post/${userId}`"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
      Posts
    </router-link>

    <!-- Albums -->
    <router-link
      v-if="userId"
      to="/albums"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
      Albums
    </router-link>
  </div>
</template>

<style scoped>
.active-menu-link {
  background-color: white;
  color: black;
}
</style>
