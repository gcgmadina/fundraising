<template>
  <ion-card class="flex flex-row-reverse flex-auto justify-around items-center">
    <div v-if="props.status" class="w-1/5">
      {{ props.status }}
    </div>

    <div class="title-section items-center w-3/5">
      <ion-card-title>{{ props.title }}</ion-card-title>
      <div class="flex flex-auto justify-between items-center">
        <ion-card-subtitle>{{ props.subtitle }}</ion-card-subtitle>
        <ion-button expand="block" @click="openDetail" size="small">Detail</ion-button>
      </div>
    </div>

    <div v-if="props.image" class="image-section flex items-center w-2/5">
      <ion-img :src="props.image" class="card-image"></ion-img>
    </div>
  </ion-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { IonCard, IonCardSubtitle, IonCardTitle, IonButton, IonImg } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: { required: true },
  subtitle: { required: true },
  image: { required: false },
  nextPage: { required: false },
  id: { required: false },
  status: { required: false }
});

const openDetail = () => {
  console.log('Detail button clicked', {
    title: props.title,
    subtitle: props.subtitle,
    image: props.image
  });
  router.push({ name: props.nextPage, params: { id: props.id } });
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