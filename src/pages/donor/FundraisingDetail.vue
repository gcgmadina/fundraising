<template>
    <BaseLayout :showHeroSection="false">
        <template #content>

            <img :src=fundraisingDetail.thumbnail alt="Gambar penggalangan dana" class="w-4/5 mx-auto">

            <h1 class="font-bold text-blue-900">{{ fundraisingDetail.title }}</h1>

            <div id="fundraising-progress">
                <p>Target Donasi:</p>
                <div class="flex justify-between items-center">
                    <h3 class="text-blue-800 my-0">Rp. {{ formatCurrency(fundraisingDetail.goal) }}</h3>
                    <p class="text-sm">{{ formatDate(fundraisingDetail.starts_on, false) }} - {{
                        formatDate(fundraisingDetail.ends_on, false) }}</p>
                </div>

                <div class="flex items-center justify-between px-4 my-3">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-100 my-2">
                        <div class="bg-yellow-600 h-2.5 rounded-full"
                            :style="{ width: (fundraisingDetail.income / fundraisingDetail.goal * 100) + '%' }">
                        </div>
                    </div>
                </div>

                <div class="flex justify-between items-center mb-2">
                    <p>Total donasi terkumpul</p>
                    <p>Waktu Tersisa</p>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <h3 class="text-blue-800 my-0">Rp. {{ formatCurrency(fundraisingDetail.income) }}</h3>
                    <h3 class="text-blue-800 my-0">{{ getDifferenceInDays(fundraisingDetail.ends_on) }} hari</h3>
                </div>
            </div>

            <ion-card class="flex flex-auto justify-around items-center"
                @click="router.push({ name: 'FundraisingAllocationList', params: { id: fundraisingDetail.name } })">
                <ion-icon :src="wallet" color="primary" size="large"></ion-icon>
                <h4 class="text">Rincian penggunaan dana</h4>
                <ion-icon :icon="GreaterThan" />
            </ion-card>

            <div v-html="fundraisingDetail.content"></div>

        </template>
        <template #footer>
            <div class="w-full px-4 py-2 flex flex-row gap-x-2">
                <ion-button
                    :class="session.isLoggedIn && user.data && user.data.roles.includes('Non Profit Accounting') ? 'w-1/2' : 'w-full'"
                    expand="block" color="primary"
                    @click="router.push({ name: 'FundraisingForm', params: { id: fundraisingDetail.name } })">
                    Donasi Sekarang
                </ion-button>

                <ion-button v-if="session.isLoggedIn && user.data && user.data.roles.includes('Non Profit Accounting')"
                    class="w-1/2" expand="block" color="success"
                    @click="router.push({ name: 'AllocationForm', params: { id: fundraisingDetail.name } })">
                    Alokasikan
                </ion-button>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton, IonCard, IonIcon, IonCardSubtitle } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from '@/data/utils';
import GreaterThan from '@/components/icons/greater-than.svg';
import { wallet } from 'ionicons/icons'
import BaseLayout from '@/components/BaseLayout.vue';
import { formatDate, getDifferenceInDays } from '@/data/DateUtils.js';


const router = useRouter();
const fundraisingDetail = ref({});
const user = inject('$user');
const session = inject('$session');

onMounted(async () => {
    fundraising.detail.fetch({
        fundraising: router.currentRoute.value.params.id
    }).then((response) => {
        fundraisingDetail.value = response;
    })
});
</script>