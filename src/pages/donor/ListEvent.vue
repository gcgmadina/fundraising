<template>
    <ion-page>
        <Header/>
        <ion-content>
            <ion-list>
                <ion-item v-for="(event, index) in eventScrollData" >
                    <CarsListItem 
                    :key="index"
                    :title="event.subject"
                    :subtitle="event.starts_on"
                    :image="event.event_thumbnail?event.event_thumbnail:'https://ionicframework.com/docs/img/demos/card-media.png'"
                    :nextPage="'EventDetail'"
                    :id="event.name">
                    </CarsListItem>
                </ion-item>
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
import { IonPage, IonContent, IonList, IonItem, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/vue"
import { eventResource, eventScrollData, getEventScroll } from "@/data/event/EventList.js"
import Header from "@/components/Header.vue"
import Footer from "@/components/donor/Footer.vue"
import CarsListItem from "@/components/CardListItem.vue"
import { ref, onMounted } from "vue";

const loadDisabled = ref(false);

const loadData = (event) => {
    setTimeout(() => {
        // event.target.complete();
        if ( eventScrollData.length >= eventResource.data.length ) {
            loadDisabled.value = true;
            event.target.complete();
        }
        else {
            getEventScroll();
            loadDisabled.value = false;
            event.target.complete();
        }
    }, 500);
}

onMounted(() => {
    getEventScroll();
});
</script>