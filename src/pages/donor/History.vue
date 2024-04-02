<template>
    <ion-page>
        <Header/>
        <ion-content>
            <ion-list>
                <CardListItem v-for="UserDonation, index in userDonationData"
                :key="index"
                :title="UserDonation.donation_type"
                :subtitle="UserDonation.item_type == 'Uang' ? 'Rp ' + UserDonation.amount : UserDonation.item_name + ': '  + UserDonation.item_amount"
                :status="UserDonation.docstatus"
                :nextPage="'DonationDetail'"
                :id="UserDonation.name"/>
            </ion-list>
            <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
        <Footer/>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { session } from '@/data/session'
import Footer from '@/components/donor/Footer.vue'
import Header from '@/components/Header.vue'
import CardListItem from '@/components/CardListItem.vue'
import { ref, onMounted } from 'vue'
import { userDonationResource, userDonationData, userDonationDataLength } from '@/data/donation/UserDonation'

const loadDisabled = ref(false);

const loadData = (event) => {
    setTimeout(() => {
        if (userDonationData.length >= userDonationDataLength.value) {
            loadDisabled.value = true;
            event.target.complete();
        } else {
            userDonationResource();
            loadDisabled.value = false;
            event.target.complete();
        }
    }, 500);
}

onMounted (() => {
    userDonationResource();
});
</script>