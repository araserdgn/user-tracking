<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useGetUsers } from "@/store/users";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const users = useGetUsers();
    const route = useRoute();
    const albumId = Number(route.params.albumId);

    onMounted(() => {
      users.getAlbumPhotos(albumId); // Fotoğrafları yükle
    });

    return {
      users,
    };
  },
});
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Photos in Album</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="photo in users.albumPhotos" :key="photo.id" class="bg-white shadow-md rounded-lg p-4">
        <img :src="photo.thumbnailUrl" :alt="photo.title" class="w-full h-auto rounded mb-2" />
        <h3 class="text-sm font-semibold text-gray-800">{{ photo.title }}</h3>
      </div>
    </div>
  </div>
</template>
