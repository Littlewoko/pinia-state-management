import { defineStore } from "pinia";

// arg[0] = store name for vue dev tools
// arg[1] = options object
export const useProductStore = defineStore("productStore", {
    // state
    state: () => {
        return {
            products: [],
        }
    },
    // actions
    actions: {
        async fill() {
            this.products = (await import("@/data/products.json")).default;
        }
    }
    // getters
})