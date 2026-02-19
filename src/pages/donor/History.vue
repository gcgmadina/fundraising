<template>
    <BaseLayout>
        <template #content>
            <h2 class="font-bold text-violet-800">Riwayat Transaksi</h2>

            <div class="sticky top-0 bg-white z-10 py-2">
                <ion-segment class="my-2" value="on-going" mode="md" v-model="currentSegment" color="tertiary">
                    <ion-segment-button value="zis">
                        <ion-label class="normal-case">ZIS</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="fundraising">
                        <ion-label class="normal-case">Penggalangan</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </div>
            
            <div v-if="currentSegment == 'zis'">
                <ion-list>
                    <ion-card mode="md" v-for="UserDonation, index in userDonationData" :key="index" @click="router.push({ name: 'DonationDetail', params: { id: UserDonation.name } })">
                        <div class="flex flex-row justify-between items-center p-2">
                            <ion-card-header class="w-[30%]">
                                <ion-card-title class="text-violet-800 text-xl w-full overflow-hidden whitespace-nowrap text-ellipsis ">{{ UserDonation.donation_type }}</ion-card-title>
                            </ion-card-header>

                            <ion-card-content class="p-0 max-w-[60%]">
                                <div class="flex flex-col justify-center items-center text-sm my-2">
                                    <div class="flex flex-row w-full">
                                        <p class="max-w-[50%] overflow-hidden whitespace-nowrap text-ellipsis">{{ UserDonation.fullname }}&nbsp</p>
                                        <p class="max-w-[50%] overflow-hidden whitespace-nowrap text-ellipsis">Rp.{{ formatCurrency(UserDonation.amount) }}</p>
                                    </div>
                                    <p class="w-full overflow-hidden whitespace-nowrap text-ellipsis">{{ UserDonation.status }}</p>
                                </div>
                            </ion-card-content>

                            <ion-icon class="w-[10%]" :icon="chevronForward" size="large" color="tertiary"></ion-icon>
                        </div>
                    </ion-card>
                </ion-list>
                <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                    </ion-infinite-scroll-content>
                </ion-infinite-scroll>
                
            </div>
            <FundraisingReceivedList v-else="currentSegment == 'fundraising'"/>
        </template>
    </BaseLayout>
</template>

<script setup>
import { IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/vue';
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userDonationResource, userDonationData, userDonationDataLength } from '@/data/donation/UserDonation'
import FundraisingReceivedList from '@/components/FundraisingReceivedList.vue';
import BaseLayout from '@/components/BaseLayout.vue';
import { chevronForward } from 'ionicons/icons';

const currentSegment = ref('zis');
const loadDisabled = ref(false);

const route = useRoute();
const router = useRouter();

const donationType = route.params.donation_type || null;

const loadData = (event) => {
    setTimeout(() => {
        if (userDonationData.length >= userDonationDataLength.value) {
            loadDisabled.value = true;
            event.target.complete();
        } else {
            userDonationResource(donationType);
            loadDisabled.value = false;
            event.target.complete();
        }
    }, 500);
}

onMounted(() => {
    userDonationResource(donationType);
});

onUnmounted(() => {
    window.location.reload();
});

const formatCurrency = (value) => {
    return value.toLocaleString('id-ID');
}
</script>
