<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "./stores/cartStrore";

import { ref, reactive } from "vue";

// destructure and maintain reactivity
// import { storeToRefs } from "pinia";
// const { products } = storeToRefs(useProductStore());
const productStore = useProductStore();
productStore.fill();

const cartStore = useCartStore();
</script>

<template>
  <div class="container">
    <TheHeader />
    <AppButton @click="cartStore.undo">Undo</AppButton>
    <AppButton @click="cartStore.redo">Redo</AppButton>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
