<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useGetUsers } from "../store/users";
import UserPostModal from "../pages/UserPostModal.vue";

// Post için TypeScript arabirimi
interface Post {
  id: number;
  title: string;
  body: string;
}

export default defineComponent({
  components: { UserPostModal },
  setup() {
    const users = useGetUsers();
    const route = useRoute();
    const userId = route.params.id;

    const selectedPost = ref<Post | null>(null); // Seçilen postu tutar

    const openPostModal = (post: Post) => {
      users.getUserPostComments(post.id); // Yorumları yükle
      selectedPost.value = post; // Seçilen postu güncelle
    };

    onMounted(() => {
      users.getUserPost(Number(userId));
    });

    return {
      users,
      openPostModal,
      selectedPost,
    };
  },
});
</script>

<template>
  <div class="bg-gray-50 p-3 ">
    <div v-for="post in users.userPost" :key="post.id" class="post">
      <div class="post-content p-5">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-body">{{ post.body }}</p>
      </div>
      <div class="see-more">
        <!-- Modal Açmak için Tıklama -->
        <a
          class="see-more-link"
          @click="openPostModal(post)"
        >
          See More
          <span class="see-more-icon">➔</span>
        </a>
      </div>
    </div>

    <!-- Modal -->
    <user-post-modal
      v-if="selectedPost"
      :modal-id="selectedPost.id"
      :body="selectedPost.body"
      :title="selectedPost.title"
    ></user-post-modal>
  </div>
</template>


<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.post-content {
  max-width: 80%;
}

.post-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.post-body {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
}

.see-more {
  display: flex;
  align-items: center;
}

.see-more-link {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  margin-right: 5px;
}

.see-more-icon {
  font-size: 18px;
  color: #007bff;
}
</style>