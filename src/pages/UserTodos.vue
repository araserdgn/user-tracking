<script lang="ts">
import { useGetUsers } from "@/store/users";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const users = useGetUsers();
    const route = useRoute();
    const userId = route.params.id;

    onMounted(() => {
      users.getUserShowData(Number(userId));
    });

    return {
      users,
    };
  },
});
</script>

<template>
  <div class="space-y-4"> <!-- Her satır arasında mesafe bırakmak için Tailwind sınıfı -->
    <div v-for="data in users.userTodos" :key="data.id" class="flex items-center space-x-4">
      <!-- Checkbox -->
      <input
          type="checkbox"
          :checked="data.completed"
          class="form-checkbox h-5 w-5 text-blue-600"
      />
      <!-- Title -->
      <span>{{ data.title }}</span>
    </div>
  </div>
</template>

<style scoped>
/* İsteğe bağlı ek stil buraya eklenebilir */
</style>
