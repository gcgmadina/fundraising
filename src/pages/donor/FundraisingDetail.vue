<template>
    <ion-page>
        <Header/>
        <ion-content class="ion-padding">
            <img :src=fundraising.detail.thumbnail alt="Gambar penggalangan dana" class="w-4/5 mx-auto">
            
            <h1>{{ fundraising.detail.title }}</h1>
            <h4>Donasi terkumpul: <span class="text-blue-500">Rp. {{ formatCurrency(fundraising.detail.income) }}</span></h4>
            <p class="mb-8">Diadakan {{ fundraising.detail.starts_on }} s\d {{ fundraising.detail.ends_on }}</p>

            <div v-html="fundraising.detail.content"></div>
        </ion-content>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { IonPage, IonContent,  } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from '@/data/utils';

const route = useRoute();
</script>