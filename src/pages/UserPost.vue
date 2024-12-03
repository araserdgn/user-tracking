<script lang="ts">
import { useGetUsers } from "../store/users";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import UserPostModal from "../pages/UserPostModal.vue";

export default defineComponent({
  components: {UserPostModal},
  setup() {
    const users = useGetUsers();
    const route = useRoute();
    const userId = route.params.id;

    onMounted(() => {
      users.getUserPost(Number(userId));
    });

    return {
      users,
    };
  },
});
</script>
<template>
<div>
<div v-for="post in users.userPost" :key="post.id"  class="post">
  <h2 class="post-title">{{ post.title }}</h2>
  <p class="post-body">{{ post.body }}</p>
  <div class="see-more">
    <a  class="see-more-link"  @click="users.getUserPostComments(post.id)" data-te-toggle="modal"
        :data-te-target="`#'modal'+${post.id}`"
        data-te-ripple-init>See More</a>
    <span class="see-more-icon">➔</span>
  </div>
  <user-post-modal :modal-id="post.id" :body="post.body" :title="post.title"></user-post-modal>
</div>
</div>
</template>
<style scoped>

</style>
