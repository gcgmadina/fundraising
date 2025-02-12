<template>
    <ion-card v-for="(entry, index) in journalEntry.list.data" class="flex flex-row" @click="router.push({ name: 'FundraisingReceivedDetail', params: { id: entry.name } })">
        <img :src="entry.Fundraising_thumbnail" alt="Gambar penggalangan dana" class="w-1/5 mx-auto">
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
        </div>

    </ion-card>
</template>

<script setup>
import { IonList, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/vue"
import { onMounted } from 'vue'
import { journalEntry } from '@/data/donation/Fundraising'
import { formatCurrency } from '@/data/utils';
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    journalEntry.list.fetch()
})
</script>