import {defineStore} from "pinia";

export const useFormatter = defineStore("useFormatter", {

    state: () => ({}),
    getters: {
        // getReceipt(state) {
        //     return state.getProduct
        // },
    },
    actions: {

        formatNumber(value: number | string) {
            if (value === undefined || value === null) {
                return '';
            }

            if (typeof value === 'string') {
                return parseFloat(value.replace(',', '.')).toLocaleString('tr-TR', { style: 'decimal' });
            } else {
                return value.toLocaleString('tr-TR', { style: 'decimal' });
            }
        },
        formatDateTime(inputDate: Date | string | null) {
            if (!inputDate) {
                return '';
            }

            const date = new Date(inputDate);
            if (isNaN(date.getTime())) {
                return '';
            }

            const padZero = (num: number): string => (num < 10 ? '0' : '') + num;

            const day = padZero(date.getDate());
            const month = padZero(date.getMonth() + 1);
            const year = date.getFullYear();
            const hours = padZero(date.getHours());
            const minutes = padZero(date.getMinutes());
            const seconds = padZero(date.getSeconds());

            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        },
        // DD.MM.YYYY HH:mm:ss
},

});
