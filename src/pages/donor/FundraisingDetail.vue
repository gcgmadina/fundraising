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
            <!-- <p>{{ fundraisingDetail.data.name }}</p> -->
        </ion-content>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent, } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from '@/data/utils';
import { createResource, toast } from 'frappe-ui';
// import { transform } from 'lodash';

const route = useRoute();
const fundraisingDetail = ref({});

onMounted(async() => {
    fundraising.detail.fetch({ 
        fundraising: route.params.id
     }).then((response) => {
        fundraisingDetail.value = response;
     })
});
</script>