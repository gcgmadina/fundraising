<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <ion-card class="p-4">
                <h1 class="text-black text-center mb-8">{{ fundraisingDetail.title }}</h1>
                <ion-item>
                    <div class="flex flex-col gap-y-2 w-full">
                        <div class="grid grid-cols-2 mb-2">
                            <div>Belum Dicairkan:</div>
                            <div class="pl-10">Rp. {{ formatCurrency(fundraisingDetail.income - fundraisingDetail.outcome) }}</div>
                        </div>
                        <div class="grid grid-cols-2 mb-2">
                            <div>Dana Keluar:</div>
                            <div class="pl-10">Rp. {{ formatCurrency(fundraisingDetail.outcome) }}</div>
                        </div>
                    </div>
                </ion-item>
                <ion-item>
                    <div class="flex flex-col gap-y-2 w-full">
                        <div class="grid grid-cols-2 mb-2">
                            <div>Terkumpul:</div>
                            <div class="pl-10">Rp. {{ formatCurrency(fundraisingDetail.income) }}</div>
                        </div>
                        <div class="grid grid-cols-2 mb-2">
                            <div>Target:</div>
                            <div class="pl-10">Rp. {{ formatCurrency(fundraisingDetail.goal) }}</div>
                        </div>
                    </div>
                </ion-item>
            </ion-card>
            <ion-list>
                <h2 class="ml-4">Riwayat Pencairan:</h2>
                <ion-item v-for="allocation in allocations" :key="allocation.id">
                    <div class="flex flex-col w-full gap-y-2">
                        <div class="flex flex-row justify-between w-full items-center">
                            <h2>Rp. {{ formatCurrency(allocation.total_credit) }}</h2>
                            <p>{{ allocation.posting_date }}</p>
                        </div>
                        <ion-label>Catatan:</ion-label>
                        <p>{{ allocation.note }}</p>
                    </div>
                </ion-item>
            </ion-list>
        </template>
    </BaseLayout>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonCard } from "@ionic/vue"
import { journalEntry, fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from '@/data/utils';
import BaseLayout from '@/components/BaseLayout.vue';

const router = useRouter();
const allocations = ref([]);
const fundraisingDetail = ref({});

onMounted(async () => {
    journalEntry.allocationList.fetch({
        "fundraising": router.currentRoute.value.params.id
    }).then((response) => {
        allocations.value = response;
    })

    fundraising.detail.fetch({
        fundraising: router.currentRoute.value.params.id
    }).then((response) => {
        fundraisingDetail.value = response;
    })
});


</script>