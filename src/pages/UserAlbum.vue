<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useGetUsers } from "@/store/users";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const users = useGetUsers();
    const router = useRouter();

    onMounted(() => {
      users.getUserAlbums(); // Albümleri yükle
    });

    const viewAlbumPhotos = (albumId: number) => {
      router.push(`/albums/${albumId}`); // Albüm fotoğraflarına yönlendir
    };

    return {
      users,
      viewAlbumPhotos,
    };
  },
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen">
    <div v-for="album in users.userAlbums" :key="album.id" class="bg-white shadow-md rounded-lg p-4">
        <img src="https://media.wired.com/photos/65204a581f7d3d1e97c68dc6/master/pass/Photo-Albums-Rave-Gear-GettyImages-1343915691.jpg" alt="User Avatar" class="w-full h-50  mb-4" />
      <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ album.title }}</h2>
      <button
        @click="viewAlbumPhotos(album.id)"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Photos
      </button>
    </div>
  </div>
</template>


<!-- <script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useGetUsers } from "@/store/users";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const users = useGetUsers();
    const router = useRouter();

    onMounted(() => {
      users.getUserAlbums(); // Albümleri yükle
      users.getAlbumPhotos(1); // İlk albümden fotoğrafları getir (örnek)
    });

    const viewAlbumPhotos = (albumId: number) => {
      router.push(`/albums/${albumId}`); // Albüm fotoğraflarına yönlendir
    };

    return {
      users,
      viewAlbumPhotos,
    };
  },
});
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Albums</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="album in users.userAlbums"
        :key="album.id"
        class="bg-white shadow-md rounded-lg overflow-hidden"
      >
      
        <div class="grid grid-cols-2 gap-1 p-2">
          <img
            v-for="photo in users.albumPhotos.filter(p => p.albumId === album.id).slice(0, 4)"
            :key="photo.id"
            :src="photo.thumbnailUrl"
            alt="Album photo"
            class="w-full h-full object-cover rounded"
          />
        </div>
     
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800 truncate mb-2">
            {{ album.title }}
          </h2>
          <button
            @click="viewAlbumPhotos(album.id)"
            class="text-sm text-blue-500 hover:underline"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  aspect-ratio: 1 / 1; 
  object-fit: cover;   
}
</style> -->
