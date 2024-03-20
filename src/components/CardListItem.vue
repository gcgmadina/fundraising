<template>
  <ion-card class="flex flex-row-reverse flex-auto justify-between items-center">
    <div class="title-section w-3/5 items-center">
      <ion-card-title>{{ props.title }}</ion-card-title>
      <div class="flex flex-auto justify-between items-center">
        <ion-card-subtitle>{{ props.subtitle }}</ion-card-subtitle>
        <ion-button expand="block" @click="openDetail">Detail</ion-button>
      </div>
    </div>

    <div class="image-section flex items-center w-2/5">
      <ion-img :src="props.image" class="card-image"></ion-img>
    </div>
  </ion-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { IonCard, IonCardSubtitle, IonCardTitle, IonButton, IonImg } from '@ionic/vue';

const props = defineProps({
  title: { required: true },
  subtitle: { required: true },
  image: { required: true },
});

const openDetail = () => {
  console.log('Detail button clicked', {
    title: props.title,
    subtitle: props.subtitle,
    image: props.image
  });
};
</script>

<style scoped>
.title-section {
  padding: 15px 15px;
  margin: 0;
}

.image-section {
  padding: 0 15px;
  margin: 0;
}
</style>