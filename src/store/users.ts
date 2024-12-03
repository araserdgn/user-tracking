import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useGetUsers = defineStore("useGetUsers", {
  state: () => ({
    userDataId: '',
    userName:'',
    userSurname:'',
    userEmail:'',
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
      };
      phone: string;
      website: string;
      company: {
        name: string;
        catchPhrase: string;
        bs: string;
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
    userAlbums: [] as {
      userId: number;
      id: number;
      title: string;
    }[],
    albumPhotos: [] as {
      albumId: number;
      id: number;
      title: string;
      url: string;
      thumbnailUrl: string;
    }[],
    openPostModal: false,
  }),
  getters: {},
  actions: {
    async getUsers() {
      try {
        await router.push("/home");
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        this.users = response.data;
      } catch {
        console.error("Failed to fetch users");
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
        console.error("Failed to fetch user data");
      }
    },

    async getUserPost(id: number) {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?userId=" + id
        );
        this.userPost = response.data;
      } catch {
        console.error("Failed to fetch user posts");
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
        console.error("Failed to fetch post comments");
      }
    },

    // async getUserAlbums() {
    //   try {
    //     const response = await axios.get("https://jsonplaceholder.typicode.com/albums");
    //     this.userAlbums = response.data;
    //   } catch {
    //     console.error("Failed to fetch user albums");
    //   }
    // },
    async getUserAlbums(userId: number) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
        this.userAlbums = response.data; // Dönen albümleri state'e kaydet
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    },

    async getAlbumPhotos(albumId: number) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        );
        this.albumPhotos = response.data;
      } catch {
        console.error("Failed to fetch album photos");
      }
    },

    clearSelectedUser() {
      // Kullanıcı seçimlerini temizle
      this.userTodos = [];
      this.userPost = [];
      this.userAlbums = [];
      this.albumPhotos = [];
    },
  },
});
