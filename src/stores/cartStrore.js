import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

import { useLocalStorage } from "@vueuse/core";

export const useCartStore = defineStore("cartStore", {
    historyEnabled: true,
    state: () => {
        return {
            items: useLocalStorage("cartStore:items", [])
        }
    },
    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        group: (state) => {
            const grouped = groupBy(state.items, item => item.name);
            const sorted = Object.keys(grouped).sort();
            const inOrder = {};

            sorted.forEach(key => {
                inOrder[key] = grouped[key];
            })

            return inOrder;
        },
        groupCount: (state) => (name) => state.group[name].length,
        total: (state) => state.items.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0),
    },
    actions: {
        checkout() {
            const AuthUserStore = useAuthUserStore();

            alert(`username: ${AuthUserStore.username}`);

            this.items = [];
        },
        addItems(count, item) {
            count = parseInt(count);


            for (let i = 0; i < count; i++) {
                this.items.push({ ...item }); // prevent reference issues
            }
        },
        deleteItems(name) {
            this.items = this.items.filter(item => item.name !== name);
        },
        updateCount(count, item) {
            this.deleteItems(item.name);

            this.addItems(count, item)
        }
    }

});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}