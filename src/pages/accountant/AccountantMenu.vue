<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <h6 class="mx-6 mb-0">Rekening</h6>
            <router-link :to="{ name: 'BankAccount' }">
                <ion-card>
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>Rekening Bank</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan" />
                        </div>
                    </ion-card-header>
                </ion-card>
            </router-link>
            <h6 class="mx-6 mb-0">Pengeluaran</h6>
            <ion-card @click="toExpenseList('Pembayaran Listrik')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Listrik</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <ion-card @click="toExpenseList('Pembayaran Air')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Air</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <ion-card @click="toExpenseList('Honor Penceramah')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Honorarium Penceramah</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header> 
            </ion-card>
            <ion-card @click="toExpenseList('Biaya Kebersihan')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Biaya Kebersihan</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <h6 class="mx-6 mb-0">Lainnya</h6>
            <ion-card @click="toAccounting">
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

const router = useRouter();

const toAccounting = () => {
    window.location.pathname = 'app/accounting';
};

const toExpenseList = (expense) => {
    router.push({ name: 'Expenses', params: { name: expense } });
};
</script>