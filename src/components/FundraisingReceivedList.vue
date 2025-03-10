<template>
    <ion-card v-for="(entry, index) in journalEntry.list.data"
        @click="router.push({ name: 'FundraisingReceivedDetail', params: { id: entry.name } })">
        <!-- <img :src="entry.Fundraising_thumbnail" alt="Gambar penggalangan dana" class="w-1/5 mx-auto">
        <ion-card-content class="w-3/5 flex flex-col justify-between" mode="ios">
            <ion-card-title class="text-lg ">{{ entry.fundraising_name }}</ion-card-title>
                <p>{{ entry.posting_date }}</p>
                <ion-card-subtitle class="text-black">Rp. <span class="text-blue-500">{{ formatCurrency(entry.total_debit) }}</span></ion-card-subtitle>

        </ion-card-content>
        <div class="flex flex-col justify-center items-center w-1/5 px-3 py-1 rounded text-white" :class="{
            'bg-blue-800': entry.docstatus === 'Menunggu Verifikasi',
            'bg-green-500': entry.docstatus === 'Diterima'
        }">
            <p>{{ entry.docstatus }}</p>
        </div> -->

        <div class="flex flex-row justify-between items-center p-2 w-full">
            <ion-card-header class="w-[30%]">
                <ion-card-title class="text-violet-800 text-sm w-full overflow-hidden text-ellipsis line-clamp-2">
                    {{ entry.fundraising_name }}
                </ion-card-title>

            </ion-card-header>

            <ion-card-content class="p-0 w-[60%]">
                <div class="flex flex-col justify-center items-center text-sm my-2">
                    <p class="overflow-hidden whitespace-nowrap text-ellipsis">Rp.{{
                        formatCurrency(entry.total_debit) }}</p>
                    <p class="overflow-hidden whitespace-nowrap text-ellipsis">{{ entry.docstatus }}</p>
                </div>
            </ion-card-content>

            <ion-icon class="w-[10%]" :icon="chevronForward" size="large" color="tertiary"></ion-icon>
        </div>
    </ion-card>
</template>

<script setup>
import { IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/vue"
import { onMounted } from 'vue'
import { journalEntry } from '@/data/donation/Fundraising'
import { formatCurrency } from '@/data/utils';
import { useRouter } from 'vue-router'
import { chevronForward } from 'ionicons/icons';

const router = useRouter()

onMounted(() => {
    journalEntry.list.fetch()
})
</script>