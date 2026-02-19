<template>
  <div class="relative">
    <div ref="carousel" class="overflow-x-auto flex flex-row">
      <slot></slot>
    </div>
    <button v-if="!isAtStart" @click="scrollLeft"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
      <img :src="SmallerIcon" alt="Scroll Left" class="w-6 h-6 rotate-180">
    </button>
    <button v-if="!isAtEnd" @click="scrollRight"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
      <img :src="GreaterIcon" alt="Scroll Right" class="w-6 h-6">
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import SmallerIcon from "@/components/icons/smaller-than.svg";
import GreaterIcon from "@/components/icons/greater-than.svg";

const carousel = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const updateArrows = () => {
  if (carousel.value) {
    const scrollLeft = carousel.value.scrollLeft;
    const maxScrollLeft = carousel.value.scrollWidth - carousel.value.clientWidth;
    isAtStart.value = scrollLeft === 0;
    isAtEnd.value = scrollLeft >= maxScrollLeft;
  }
};

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: -carousel.value.firstElementChild.offsetWidth,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: carousel.value.firstElementChild.offsetWidth,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  if (carousel.value) {
    carousel.value.addEventListener("scroll", updateArrows);
    updateArrows();
  }
});

watch(() => carousel.value?.scrollWidth, updateArrows);
</script>

<style scoped>
.overflow-x-auto {
  scroll-behavior: smooth;
}
</style>