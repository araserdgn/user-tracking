<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import SideBarMenu from "../master/defaultPages/SideBarMenu.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { useMasterSettings } from "@/store/master/settings";
import { useGetUsers } from "@/store/users"; // Users store'u dahil ettik


export default defineComponent({
  components: { 
    SideBarMenu 
  },

  setup() {
    const email = localStorage.getItem("userEmail");
    const username = localStorage.getItem("userUsername");

    const route = useRoute();
    const settings = useMasterSettings();
    const users = useGetUsers(); // Users store'u kullanıyoruz

    const imageUrl = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid";

    const toggleSideBar = () => {
      settings.openSidebar = !settings.openSidebar;
    };

    const handleResize = () => {
      settings.openSidebar = window.innerWidth > 768;
    };

    const gotoHome = async () => {
      // Kullanıcı bilgilerini LocalStorage'dan temizle
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUsername");
      users.userDataId = "";
      users.userName = "";
      users.userEmail = "";
      users.userSurname = "";



      // Kullanıcı listesini yeniden yükle
      users.getUsers();

      // Users sayfasına yönlendir
      await router.push("/home");
    };

    onMounted(() => {
      handleResize();

      // Manual check for localStorage changes at a regular interval
    });

    return {
      settings,
      imageUrl,
      toggleSideBar,
      gotoHome, // Geri Dön fonksiyonunu döndürüyoruz
      users,
    };
  },
});
</script>

<template>
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'block': settings.openSidebar, 'hidden': !settings.openSidebar }">
      <div class="sidebar-logo">
        <div class="flex items-center">
          <img :src="imageUrl" alt="Avatar" class="rounded-full w-12 h-12"/>
          <div class="p-2">
            <p class="text-white font-semibold">{{ users.userName }}</p>
            <p class="text-gray-200">{{ users.userEmail }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <div class="sidebar-menu">
        <side-bar-menu /> <!-- This is the registered component -->
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col w-full relative overflow-hidden bg-white">
      <div class="overflow-y-auto">
        <div class="text-m mt-7 ml-8">
          <router-link to="/home" @click.prevent="gotoHome"><strong>Geri Dön</strong></router-link>
        </div>
        <div class="flex-1 p-[20px] flex flex-col">
          <div class="border border-gray-300 rounded-md p-[20px] flex-1">
            <router-view />
          </div>
        </div>
        <div class="p-4 text-center text-secondary-700 dark:bg-gray-700 dark:text-secondary-200">
          <label> © 2024 | </label>
          <a class="dark:text-secondary-400" href="#">Backend task by Aras Erdoğan</a>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang="css">
.sidebar {
  @apply w-[250px] h-full bg-blue-600;
  background: var(--sidebar-blue);
}

.sidebar-logo {
  @apply h-[55px] text-white flex justify-between items-center px-[30px] border-b-2 border-b-[#0c4a6e];
  background: var(--sidebar-logo-blue);
}

.sidebar-menu {
  @apply h-[calc(100vh-55px)] text-white py-[20px];
  background: var(--sidebar-menu-blue);
  color: black;
}

.header {
  @apply sticky top-0 flex items-center shadow-sm px-[20px] w-full py-[1px] z-10 dark:bg-gray-700;
  background: var(--header-blue);

}
</style>
