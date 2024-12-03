<script lang="ts">
import {defineComponent} from 'vue'
import {useGetUsers} from "../store/users";

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
    const users=useGetUsers();
    return {users};
  }
});
</script>

<template>
  <div v-if="users.openPostModal" :id="'modal-'+modalId"
       class="fixed inset-0 flex items-center justify-center z-50 ">
    <div class="absolute inset-0 bg-black opacity-10 dark:bg-gray-900"></div>
    <div class="relative bg-white dark:bg-gray-800 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{title}}{{body}}</h3>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800 dark:text-gray-300 focus:outline-none">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr>
      {{users.userPostComments}}
      <hr>
    </div>
  </div>
</template>

<style scoped>

</style>
