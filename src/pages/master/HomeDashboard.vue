<script lang="ts">
import { defineComponent, ref, watchEffect, onMounted, onBeforeUnmount } from 'vue';
import SideBarMenu from "../master/defaultPages/SideBarMenu.vue";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import router from "@/router";
import { useMasterSettings } from "@/store/master/settings";
import { useGetUsers } from "@/store/users"; // Users store'u dahil ettik

interface Breadcrumb {
  text: string;
  route: string;
}

export default defineComponent({
  components: { SideBarMenu },

  setup() {
    const route = useRoute();
    const titleName = localStorage.getItem("site_title");
    const settings = useMasterSettings();
    const users = useGetUsers(); // Users store'u kullanıyoruz

    const title = ref(localStorage.getItem('site_title') || '');
    const imageUrl = ref(localStorage.getItem('logo') || '');
    const crumbs = ref<Breadcrumb[]>([]);

    const toggleSideBar = () => {
      settings.openSidebar = !settings.openSidebar;
    };

    const handleResize = () => {
      settings.openSidebar = window.innerWidth > 768;
    };

    const updateLocalStorage = () => {
      title.value = localStorage.getItem('site_title') || '';
      imageUrl.value = localStorage.getItem('logo') || '';
    };

    const storageEventHandler = (event: StorageEvent) => {
      if (event.key === 'site_title' || event.key === 'logo') {
        updateLocalStorage();
      }
    };

    const generateCrumbs = (route: RouteLocationNormalizedLoaded) => {
      const newCrumbs: Breadcrumb[] = [];
      route.matched.forEach((route) => {
        if (route.meta && typeof route.meta.breadcrumb === 'string') {
          newCrumbs.push({ text: route.meta.breadcrumb, route: route.path });
        }
      });
      return newCrumbs;
    };

    const gotoHome = async () => {
      // Kullanıcı bilgilerini LocalStorage'dan temizle
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUsername");

      // Kullanıcı listesini yeniden yükle
      users.getUsers();

      // Users sayfasına yönlendir
      await router.push("/home");
    };

    onMounted(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      window.addEventListener('storage', storageEventHandler);

      // Manual check for localStorage changes at a regular interval
      setInterval(updateLocalStorage, 1000);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('storage', storageEventHandler);
    });

    watchEffect(() => {
      crumbs.value = generateCrumbs(route);
      updateLocalStorage();
    });

    return {
      settings,
      title,
      imageUrl,
      toggleSideBar,
      crumbs,
      titleName,
      gotoHome, // Geri Dön fonksiyonunu döndürüyoruz
    };
  },
});
</script>

<template>
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'block': settings.openSidebar, 'hidden': !settings.openSidebar }">
      <div class="sidebar-logo">
        <div class="flex items-center" @click="gotoHome">
          <img :src="imageUrl" alt="Logo" class="uploaded-image mx-auto sm:mx-0 max-w-32 max-h-16 min-w-24 min-h-10" />
        </div>
        <div class="cursor-pointer w-[1px]" @click="toggleSideBar">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
            class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>
      </div>
      <div class="sidebar-menu">
        <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
          <side-bar-menu />
        </div>
      </div>
    </div>

    <!-- Main -->
    <div class="flex-1 flex flex-col w-full relative overflow-hidden bg-white">
      <div class="overflow-y-auto">
        <div class="text-m mt-7 ml-8">
          <router-link to="/home" @click.prevent="gotoHome"><strong>Geri Dön</strong></router-link>
          <router-link v-for="(crumb, index) in crumbs" :to="crumb.route" :key="index"><strong>{{ crumb.text }}</strong>
          </router-link>
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
  @apply w-[200px] h-full bg-blue-600;
  background: var(--sidebar-blue);
}

.sidebar-logo {
  @apply h-[55px] text-white flex justify-between items-center px-[30px] border-b-2 border-b-[#0c4a6e];
  background: var(--sidebar-logo-blue);
}

.sidebar-menu {
  @apply h-[calc(100vh-55px)] text-white py-[20px];
  background: var(--sidebar-menu-blue);
}

.header {
  @apply sticky top-0 flex items-center shadow-sm px-[20px] w-full py-[1px] z-10 dark:bg-gray-700;
  background: var(--header-blue);

}
</style>
