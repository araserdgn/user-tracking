import {defineStore} from "pinia";
import {ref} from "vue";

export const useMasterSettings = defineStore("useMasterSettings", {

    state: () => ({
        openSidebar:ref(false),
    }),
    getters: {
        // getReceipt(state) {
        //     return state.getProduct
        // },
    },
    actions: {

    },

});
