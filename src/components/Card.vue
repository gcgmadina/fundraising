<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title class="text-xl font-bold">{{props.title}}</ion-card-title>
            <ion-card-subtitle>{{props.subtitle}}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            {{props.content}}
        </ion-card-content>
    </ion-card>
</template>
  
<script setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';

const props = defineProps({
    title: {required: true },
    subtitle: {required: true },
    content: {required: false },
});

</script>

<style scoped>
    ion-card {
        width: 100%;
    }  
</style>