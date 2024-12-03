<script lang="ts">
import { useGetUsers } from "../store/users";
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const users = useGetUsers();
    const router = useRouter();

    // Kullanıcı seçme ve bilgilerini kaydetme
    const gotoUserData = (id: number, name: string, email: string, username: string) => {
      localStorage.setItem("userId", String(id));
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userUsername", username);
      
      users.userDataId = String(id);
      users.userName = name;
      users.userEmail = email;
      users.userSurname = username;

      users.getUserShowData(id); // Kullanıcıyla ilgili verileri getir
      router.push(`/users/${id}`); // Todos sayfasına yönlendir
    };

    // İlk yüklemede kullanıcıları getir
    onMounted(() => {
      users.getUsers();
    });

    return {
      users, 
      gotoUserData,
    };
  },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
    <div v-for="user in users.users" :key="user.id" class="bg-white shadow-md rounded-lg overflow-hidden p-6" @click="gotoUserData(user.id, user.name, user.email, user.username)">
      <div class="flex items-center space-x-4" >
        <!-- Kullanıcı Fotoğrafı -->
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            alt="User Avatar"
            class="w-24 h-24 rounded-full"
          />
        </div>

        <!-- Kullanıcı Bilgileri -->
        <div class="text-left">
          <h2 class="text-lg font-bold text-gray-800">{{ user.name }}</h2>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
          <p class="text-sm text-gray-500">{{ user.phone }}</p>
        </div>
      </div>

      <!-- Location -->
      <div class="mt-6 text-sm text-left">
        <div class="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
          <div class="ms-2">
            <p class="font-semibold text-gray-800">Location</p>
            <p class="text-gray-600">{{ user.address.street }}, {{ user.address.city }}</p>
          </div>
        </div>

        <!-- Company -->
        <div class="flex items-center mb-4">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M6 7v-7h13v10h5v14h-23v-17h5zm0 16v-4h-1v4h1zm8-4h-3v4h3v-4zm6 0h-1v4h1v-4zm2-7h-3v6h2v4h1v-10zm-5-10h-9v20h1v-5h7v5h1v-20zm-13 20v-4h2v-9h-3v13h1zm17-6h-1v-2h1v2zm-17-2h1v2h-1v-2zm8 1h-2v-2h2v2zm3 0h-2v-2h2v2zm-10-4v2h-1v-2h1zm7 1h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm3 0h-2v-2h2v2zm-3-3h-2v-2h2v2zm3 0h-2v-2h2v2z"/></svg>
          <div class="ms-2">
            <p class="font-semibold text-gray-800">Company</p>
            <p class="text-gray-600">{{ user.company.name }}</p>
          </div>
        </div>

        <!-- Website -->
        <div class="flex items-center">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12.02 0c6.614.011 11.98 5.383 11.98 12 0 6.623-5.376 12-12 12-6.623 0-12-5.377-12-12 0-6.617 5.367-11.989 11.981-12h.039zm3.694 16h-7.427c.639 4.266 2.242 7 3.713 7 1.472 0 3.075-2.734 3.714-7m6.535 0h-5.523c-.426 2.985-1.321 5.402-2.485 6.771 3.669-.76 6.671-3.35 8.008-6.771m-14.974 0h-5.524c1.338 3.421 4.34 6.011 8.009 6.771-1.164-1.369-2.059-3.786-2.485-6.771m-.123-7h-5.736c-.331 1.166-.741 3.389 0 6h5.736c-.188-1.814-.215-3.925 0-6m8.691 0h-7.685c-.195 1.8-.225 3.927 0 6h7.685c.196-1.811.224-3.93 0-6m6.742 0h-5.736c.062.592.308 3.019 0 6h5.736c.741-2.612.331-4.835 0-6m-12.825-7.771c-3.669.76-6.671 3.35-8.009 6.771h5.524c.426-2.985 1.321-5.403 2.485-6.771m5.954 6.771c-.639-4.266-2.242-7-3.714-7-1.471 0-3.074 2.734-3.713 7h7.427zm-1.473-6.771c1.164 1.368 2.059 3.786 2.485 6.771h5.523c-1.337-3.421-4.339-6.011-8.008-6.771"/></svg>
          <div class="ms-2">
            <p class="font-semibold text-gray-800">Website</p>
            <a
              :href="'http://' + user.website"
              target="_blank"
              class="text-blue-500 hover:underline"
            >
              {{ user.website }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
