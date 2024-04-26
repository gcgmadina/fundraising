<template>
    <ion-page>
        <Header></Header>
        <ion-content>
            <ion-list>
                <ion-item v-for="(donation, index) in donationEventScrollData">
                    <CardListItem  
                    :key="index" 
                    :title="donation.subject" 
                    :subtitle="donation.starts_on + ' - ' + donation.ends_on"
                    :image="donation.event_thumbnail ? donation.event_thumbnail : 'https://ionicframework.com/docs/img/demos/card-media.png'"
                    :nextPage="'EventDetail'"
                    :id="donation.name">
                    </CardListItem>
                </ion-item>
            </ion-list>
            <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import { IonPage, IonContent, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem } from "@ionic/vue"
import CardListItem from "@/components/CardListItem.vue"
import Header from "@/components/Header.vue"
import Footer from "@/components/donor/Footer.vue"
import { donationEvent, donationEventScrollData, getDonationEventScroll } from "@/data/event/EventList";

const loadDisabled = ref(false)

const loadData = (event) => {
    setTimeout(() => {
        if (donationEventScrollData.length >= donationEvent.data.length) {
            loadDisabled.value = true
            event.target.complete()
        } else {
            getDonationEventScroll()
            loadDisabled.value = false
            event.target.complete()
        }
    }, 500)
}

onMounted(() => {
    getDonationEventScroll()
})
</script>