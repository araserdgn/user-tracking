<script lang="ts">
import { defineComponent } from 'vue';
import { useGetUsers } from "../store/users";

export default defineComponent({
  name: "userPostModal",
  props: {
    modalId: String,
    title: String,
    body: String,
  },
  methods: {
    closeModal() {
      this.users.openPostModal = false;
    }
  },
  setup() {
    const users = useGetUsers();
    return { users };
  }
});
</script>

<template>
  <div v-if="users.openPostModal" :id="'modal-'+modalId" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-black opacity-50 dark:bg-gray-900"></div>
    <div class="relative bg-white sm:w-full md:w-2/3 lg:w-1/2 xl:w-3/5 p-6 rounded-lg shadow-lg">
      <!-- Başlık ve Kapatma Butonu -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr class="my-4">
      
      <!-- İçerik: Post ve Comments -->
      <div class="flex space-x-6">
        <!-- Post Bilgisi -->
        <div class="flex-1 bg-gray-50 p-4 rounded-md shadow">
          <p class="text-gray-700 font-medium">{{ body }}</p>
        </div>
        
        <!-- Comments -->
        <div class="flex-1 bg-gray-50 p-4 rounded-md shadow max-h-60 overflow-y-auto">
          <h4 class="text-md font-semibold text-gray-900 mb-3">Comments</h4>
          <ul class="space-y-3">
            <li v-for="comment in users.userPostComments" :key="comment.id" class="flex items-start">
              <img
                class="w-10 h-10 rounded-full mr-3"
                :src="comment.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfiBogr9NDiw9q1BJV7MyCSM9SLHfdJg7QWQ&s'"
                alt="User avatar"
              />
              <div>
                <h5 class="text-sm font-semibold">{{ comment.name }}</h5>
                <p class="text-sm text-gray-600">{{ comment.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ek stil düzenlemeleri yapılabilir */
</style>
