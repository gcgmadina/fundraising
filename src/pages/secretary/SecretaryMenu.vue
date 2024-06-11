<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <h6 class="mx-6 mb-0">Inventaris Masjid</h6>
            <router-link :to="{ name: 'ItemGroups' }">
                <ion-card>
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>Daftar Barang</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan" />
                        </div>
                    </ion-card-header>
                </ion-card>
            </router-link>
            <router-link :to="{ name: 'addPurchaseReceipt' }">
                <ion-card>
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>Pembelian Barang</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan" />
                        </div>
                    </ion-card-header>
                </ion-card>
            </router-link>
            <h6 class="mx-6 mb-0">Lainnya</h6>
            <ion-card @click="toStock">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Lainnya</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
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
import { useRouter } from 'vue-router';

const toStock = () => {
    window.location.pathname = 'app/stock';
};
</script>