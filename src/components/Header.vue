<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start" v-if="showBackButton">
                <ion-back-button defaultHref="/" />
            </ion-buttons>

            <img v-if="!computedTitle"
                src="@/components/icons/WhatsApp_Image_2023-12-18_at_10.48.59_9397a2c2-removebg-preview (1).jpg"
                alt="logo" class="w-52 mx-auto block" />

            <h1 v-else class="text-center w-full">{{ computedTitle }}</h1>

            <ion-buttons slot="end">
                <slot name="end"></slot>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
</template>

<script setup>
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from '@ionic/vue';
import { defineProps, computed } from 'vue';

const props = defineProps({
    showBackButton: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    }
});

const computedTitle = computed(() => {
    return props.title || '';
});
</script>