<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <router-link :to="{ name: 'BankAccount' }">
                <ion-card>
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>Rekening Bank</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan"/>
                        </div>
                    </ion-card-header>
                </ion-card>            
            </router-link>
            <ion-card @click="toAccounting">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Lainnya</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan"/>
                    </div>
                </ion-card-header>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonIcon } from '@ionic/vue';
import Header from '@/components/Header.vue';
import GreaterThan from '@/components/icons/greater-than.svg';

const toAccounting = () => {
    window.location.pathname = 'app/accounting';
};
</script>