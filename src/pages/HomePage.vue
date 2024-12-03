<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
    <div v-for="user in users" :key="user.id">
      <div @click="gotoUserData(user.id, user.name, user.email, user.username)"
        class="bg-white shadow-md rounded-lg overflow-hidden p-6 flex flex-col items-center text-center">

        <!-- Kullanıcı Fotoğrafı -->
        <img src="https://via.placeholder.com/100" alt="User Avatar" class="w-24 h-24 rounded-full mb-4" />

        <!-- Kullanıcı Bilgileri -->
        <h2 class="text-xl font-semibold text-gray-800">{{ user.name }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
        <p class="text-gray-500">{{ user.phone }}</p>

        <!-- Ek Bilgiler -->
        <div class="mt-4 text-sm text-gray-600">
          <div class="flex items-center space-x-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8 21h8m4-10a4 4 0 00-4-4H8a4 4 0 00-4 4v0a4 4 0 004 4h8a4 4 0 004-4zM8 7V5a4 4 0 014-4v0a4 4 0 014 4v2" />
            </svg>
            <p>{{ user.address.street }}, {{ user.address.city }}</p>
          </div>
          <div class="flex items-center space-x-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 21v-6a3 3 0 013-3h0a3 3 0 013 3v6m-6 0h6" />
            </svg>
            <p>{{ user.company.name }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
              stroke="currentColor" class="w-5 h-5 text-gray-700">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M9 20h6m-6-8h6m-3-8h0m-3 16h0" />
            </svg>
            <a :href="'http://' + user.website" target="_blank" class="text-blue-500 hover:underline">
              {{ user.website }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useGetUsers } from "../store/users";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    const users = useGetUsers();

    const gotoUserData = (id: number, name: string, email: string, username: string) => {
      localStorage.setItem('userName', name);
      localStorage.setItem('userUsername', username);  // Buradaki surname'yi username ile değiştirin
      localStorage.setItem('userId', String(id));
      localStorage.setItem('userEmail', email);

      users.getUserShowData(id);
    };

    onMounted(() => {
      users.getSalesRepresentatives();
    });

    return {
      users: users.users,  // users store'dan gelen veriye doğrudan erişim
      gotoUserData
    };
  }
});
</script>

<style scoped></style>
