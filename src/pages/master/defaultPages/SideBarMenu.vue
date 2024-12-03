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
    <div class="me-2">
      <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"/></svg>
    </div>
      Users
    </router-link>

    <!-- Todos -->
    <router-link
      v-if="userId"
      :to="`/users/${userId}`"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
    <div class="me-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 2v20h-20v-20h20zm2-2h-24v24h24v-24zm-4 7h-8v1h8v-1zm0 5h-8v1h8v-1zm0 5h-8v1h8v-1zm-10.516-11.304l-.71-.696-2.553 2.607-1.539-1.452-.698.71 2.25 2.135 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304zm0 5l-.71-.696-2.552 2.607-1.539-1.452-.698.709 2.249 2.136 3.25-3.304z"/></svg>
    </div>
      Todos
    </router-link>

    <!-- Posts -->
    <router-link
      v-if="userId"
      :to="`/users-post/${userId}`"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
    <div class="me-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 22v-20h16v11.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-14.386h-20v24h10.189c3.163 0 9.811-7.223 9.811-9.614zm-5-1.386h-10v-1h10v1zm0-4h-10v1h10v-1zm0-3h-10v1h10v-1z"/></svg>
    </div>
      Posts
    </router-link>

    <!-- Albums -->
    <router-link
      v-if="userId"
      to="/albums"
      active-class="active-menu-link"
      class="inline-flex items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-black"
    >
      <div clas="me-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.698 10.658l2.302 1.342-12.002 7-11.998-7 2.301-1.342 9.697 5.658 9.7-5.658zm-9.7 10.657l-9.697-5.658-2.301 1.343 11.998 7 12.002-7-2.302-1.342-9.7 5.657zm0-19l8.032 4.685-8.032 4.685-8.029-4.685 8.029-4.685zm0-2.315l-11.998 7 11.998 7 12.002-7-12.002-7z"/></svg>
      </div>
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
