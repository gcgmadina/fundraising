<template>
    <ion-page>
        <Header/>
        <ion-content>
            <ion-list>
                <CardListItem v-for="UserDonation, index in userDonationData"
                :key="index"
                :title="UserDonation.fullname"
                :subtitle="UserDonation.item_type == 'Uang' ? UserDonation.donation_type + ' Rp.' + formatCurrency(UserDonation.amount) : UserDonation.donation_type + ' ' + UserDonation.item_name + ': '  + UserDonation.item_amount"
                :status="UserDonation.status"
                @click="router.push({ name: 'DonationDetail', params: { id: UserDonation.name } })"/>
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
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userDonationResource, userDonationData, userDonationDataLength } from '@/data/donation/UserDonation'
import Footer from '@/components/donor/Footer.vue'
import Header from '@/components/Header.vue'
import CardListItem from '@/components/CardListItem.vue'

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
