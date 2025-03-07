<template>
    <IonPage>
        <!-- Header -->
        <IonHeader class="bg-white" mode="md">
            <IonToolbar class="bg-white text-white">
                <img slot="start"
                    src="@/components/icons/Madina-logo.png"
                    alt="logo" class="h-10 mx-auto block ml-4">
                <img slot="end"
                    src="@/components/icons/WhatsApp_Image_2023-12-18_at_10.48.59_9397a2c2-removebg-preview (1).jpg"
                    alt="logo" class="h-14 mx-auto block">
            </IonToolbar>
        </IonHeader>
        <!-- <Header></Header> -->

        <!-- Main Content with Sidebar -->
        <div class="flex h-full">

            <!-- Main Page Content -->
            <IonContent class="ion-padding">
                <!-- Hero section -->
                <HeroSection v-if="showHeroSection"></HeroSection>

                <!-- <img src="@/components/icons/masjid_nabawi.webp" alt="gambar"> -->
                <slot name="content" />
            </IonContent>
        </div>

        <!-- Footer -->
        <!-- <IonFooter>
            <IonToolbar class="bg-primary text-white">
                <p class="text-center w-full">© 2025 My App</p>
            </IonToolbar>
        </IonFooter> -->
        <Footer></Footer>
    </IonPage>
</template>

<script setup>
import { defineProps } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton } from '@ionic/vue';
import Footer from "@/components/donor/Footer.vue";
import HeroSection from "@/components/HeroSection.vue";

defineProps({
    showHeroSection: {
        type: Boolean,
        default: true // Secara default HeroSection tetap muncul
    }
});
</script>