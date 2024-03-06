<template>
    <ion-card class="responsive-card">
        <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
        <ion-card-header>
            <ion-card-title>Card Title</ion-card-title>
            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>
    </ion-card>
</template>
  
<script setup>
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineProps } from 'vue';

// const props = defineProps({
//     title: {required: true },
//     subtitle: {required: true },
//     content: {required: false },
// });
</script>

<!-- <style scoped>
.responsive-card {
    /* Base size */
    width: 300px; /* Fixed width */
    height: 500px; /* Height adjusts to content */
    margin: 0 auto; /* Center the card */

    /* Responsive adjustments */
    @media (max-width: 768px) {
        width: 80%; /* Adjust width to be 80% of the viewport on smaller screens */
    }

    @media (max-width: 480px) {
        width: 95%; /* Adjust width to be 95% of the viewport on very small screens */
    }
}

img {
    width: 100%; /* Make image responsive within the card */
    height: auto; /* Maintain aspect ratio */
}
</style> -->