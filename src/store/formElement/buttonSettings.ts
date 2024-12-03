import {defineStore} from "pinia";

export const useButtonSettings = defineStore("buttonSettings", {

    state: () => ({

        openShowModal:false,
        openShowModalNewEmail:false,
        openShowModalNewProduct:false,
        openShowModalProducts:false,
        openShowModalStock:false,
        openShowModalCustomerDetail:false,
        openShowModalCustomerDiscount:false,
        openShowOffersShow:false,

    }),
    getters: {
        // getReceipt(state) {
        //     return state.getProduct
        // },
    },
    actions: {

        modalSettings(){
            this.openShowModal= true;
        },
        modalSettingsProductShow(){
            this.openShowModalProducts= true;
        },
        modalSettingsNewEmail(){
            this.openShowModalNewEmail= true;
        }   ,
        modalSettingsNewProduct(){
            this.openShowModalNewProduct= true;
        },
        modalSettingStock(){
            this.openShowModalStock= true;
        } ,
        modalSettingCustomerDetail(){
            this.openShowModalCustomerDetail= true;
        },
        modalSettingCustomerDiscount(){
            this.openShowModalCustomerDiscount= true;
        },
        modalSettingOffersShow(){
            this.openShowOffersShow= true;
        },
    },

});
