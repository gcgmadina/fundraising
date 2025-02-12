<template>
    <ion-page>
        <Header />
        <ion-content class="ion-padding">
            <img :src=fundraisingDetail.thumbnail alt="Gambar penggalangan dana" class="w-4/5 mx-auto">

            <h1>{{ fundraisingDetail.title }}</h1>
            <h4>Donasi terkumpul: <span class="text-blue-500">Rp. {{ formatCurrency(fundraisingDetail.income) }}</span>
            </h4>
            <p class="mb-8">Diadakan {{ fundraisingDetail.starts_on }} s\d {{ fundraisingDetail.ends_on }}</p>

            <div v-html="fundraisingDetail.content"></div>
        </ion-content>
        <div class="w-full px-4 py-2 flex flex-row gap-x-2">
            <ion-button :class="user.data.roles.includes('Non Profit Accounting') ? 'w-1/2' : 'w-full'" expand="block"
                color="primary"
                @click="router.push({ name: 'FundraisingForm', params: { id: fundraisingDetail.name } })">
                Donasi Sekarang
            </ion-button>
            <ion-button v-if="user.data.roles.includes('Non Profit Accounting')" class="w-1/2" expand="block"
                color="success"
                @click="router.push({ name: 'AllocationForm', params: { id: fundraisingDetail.name } })">
                Alokasikan
            </ion-button>
        </div>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from '@/data/utils';
import { createResource, toast } from 'frappe-ui';
// import { transform } from 'lodash';

const router = useRouter();
const fundraisingDetail = ref({});
const user = inject('$user');

onMounted(async () => {
    fundraising.detail.fetch({
        fundraising: router.currentRoute.value.params.id
    }).then((response) => {
        fundraisingDetail.value = response;
    })
});
</script>