<template>
    <ion-card class="responsive-card">
        <!-- <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" /> -->
        <img alt="Silhouette of mountains" :src="props.thumbnail" />
        <ion-card-header>
            <ion-card-title>{{props.title}}</ion-card-title>
            <!-- <ion-card-subtitle>{{props.subtitle}}</ion-card-subtitle> -->
        </ion-card-header>

        <ion-card-content>
            {{props.content}}
        </ion-card-content>
    </ion-card>
</template>
  
<script setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineProps } from 'vue';

const props = defineProps({
    title: {required: true },
    // subtitle: {required: true },
    thumbnail: {required: false },
    content: {required: false },
});
</script>

<style scoped>
img {
    width: 100%;
    height: 140px;
    object-fit: cover;
}
</style>