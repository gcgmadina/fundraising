<template>
    <ion-page>
        <Header/>
        <ion-content class="ion-padding">
            <h1 >Daftar Penggalangan Dana</h1>
            <div class="sticky top-0 bg-white z-10 py-2">
                <ion-segment class="my-2" value="on-going" mode="ios" v-model="currentSegment">
                    <ion-segment-button value="on-going">
                        <ion-label>Berlangsung</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="ended">
                        <ion-label>Selesai</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </div>

            <onGoingFundraising v-if="currentSegment == 'on-going'"></onGoingFundraising>
            <endedFundraising v-else-if="currentSegment == 'ended'"></endedFundraising>

        </ion-content>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { useRouter } from 'vue-router';
import { formatCurrency } from '@/data/utils';
import onGoingFundraising from '@/components/FundraisingOnGoing.vue';
import endedFundraising from '@/components/FundraisingEnded.vue';

const router = useRouter();
const currentSegment = ref('on-going');

onMounted(() => {
    fundraising.getList.fetch()
})
</script>