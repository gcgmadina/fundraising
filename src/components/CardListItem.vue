<template>
  <ion-card class="flex flex-row-reverse flex-auto justify-around items-center">
    <!-- Slot untuk status -->
    <div v-if="props.status" class="w-1/5">
      <slot name="status">
        {{ props.status }}
      </slot>
    </div>

    <!-- Slot untuk title -->
    <div class="title-section flex flex-col w-3/5 p-4">
      <slot name="title">
        <ion-card-title class="text-xl font-bold">{{ props.title }}</ion-card-title>
      </slot>
      <div class="flex justify-between items-center w-full mt-2">
        <slot name="subtitle">
          <ion-card-subtitle class="text-sm text-gray-500">{{ props.subtitle }}</ion-card-subtitle>
        </slot>
      </div>
    </div>

    <!-- Slot untuk image -->
    <div v-if="props.image" class="image-section flex items-center p-4">
      <slot name="image">
        <!-- Cek tipe data props.image dan gunakan komponen atau gambar -->
        <component :is="imageComponent" :src="props.image" class="w-full h-auto"></component>
      </slot>
    </div>
  </ion-card>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { IonCard, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/vue';

const props = defineProps({
  title: { required: false },
  subtitle: { required: false },
  image: { required: false },
  nextPage: { required: false },
  id: { required: false },
  status: { required: false }
});

const imageComponent = computed(() => {
  // Jika props.image adalah string, gunakan IonImg
  // Jika props.image adalah objek atau fungsi (misalnya komponen icon), gunakan props.image secara langsung
  return typeof props.image === 'string' ? IonImg : props.image;
});
</script>

<style scoped>
.image-section {
  max-width: 40%;
}
</style>
