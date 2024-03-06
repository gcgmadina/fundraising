<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>
                    Form Infaq
                </ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Form Infaq</ion-title>
                </ion-toolbar>
            </ion-header>

            <DonationForm />
        </ion-content>
    </ion-page>
</template>

<script setup>
import DonationForm from "@/components/donor/DonationForm.vue"
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue"
</script>