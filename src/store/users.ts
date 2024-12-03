import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useGetUsers = defineStore("useGetUsers", {
  state: () => ({
    users: [] as {
      id: number;
      name: string;
      username: string;
      email: string;
      address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
          lat: string;
          lng: string;
        };
        phone: string;
        website: string;
        company: {
          name: string;
          catchPhrase: string;
          bs: string;
        };
      };
    }[],
    userTodos: [] as {
      title: string;
      completed: boolean;
    }[],
    userPost: [] as {
      id: number;
      title: string;
      body: string;
    }[],
    userPostComments: [] as {
      name: string;
      email: string;
      body: string;
    }[],
    openPostModal: false,
  }),
  getters: {},
  actions: {
    async getSalesRepresentatives() {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        this.users = response.data;
      } catch {
        // ElMessage.error("Failed to fetch users");  // Hata mesajı eklemek isterseniz buraya kullanabilirsiniz.
      }
    },

    async getUserShowData(id: number) {
      await router.push("/users/" + id);

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos?userId=" + id
        );
        this.userTodos = response.data;
      } catch {
        // ElMessage.error("Failed to fetch user data");
      }
    },

    async getUserPost(id: number) {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?userId=" + id
        );
        this.userPost = response.data;
      } catch {
        // ElMessage.error("Failed to fetch user posts");
      }
    },

    async getUserPostComments(id: number) {
      this.openPostModal = true;

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/comments?postId=" + id
        );
        this.userPostComments = response.data;
      } catch {
        // ElMessage.error("Failed to fetch post comments");
      }
    },
  },
});
