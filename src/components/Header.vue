<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start" v-if="showBackButton">
                <ion-back-button defaultHref="/"/>
            </ion-buttons>

            <img src="@/components/icons/WhatsApp_Image_2023-12-18_at_10.48.59_9397a2c2-removebg-preview (1).jpg"
                alt="logo" />
        </ion-toolbar>
    </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/vue';
import { defineProps } from 'vue';

const props = defineProps({
    showBackButton: {
        type: Boolean,
        default: false
    }
});

console.log(props.showBackButton);
</script>

<style scoped>
img {
    width: 200px;
    height: auto;
    margin: 0 auto;
    display: block;
}
</style>