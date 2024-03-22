<template>
  <ion-page>
    <Header></Header>
    <ion-content>
      <div class="event-section">
        <div class="event-header">
          <h2>Kegiatan</h2>
          <button style="color: blue;" @click="toEventList">See more</button>
        </div>
        <div class="overflow-x-auto flex flex-row">
          <div class="card-container" v-for="(event, index) in tenEvents" :key="index">
            <router-link :to="{ name: 'EventDetail', params: { id: event.name } }">
              <ImageCard :title="event.subject"
              :thumbnail="event.thumbnail?event.thumbnail:'https://ionicframework.com/docs/img/demos/card-media.png'"
              :content="event.starts_on">
              </ImageCard>
            </router-link>
          </div>
        </div>
      </div>
      <div class="menu-button-list">
        <MenuButton
          v-for="menu in menus"
          :key="menu.route"
          :icon="menu.icon"
          :label="menu.label"
          :route="menu.route"
        ></MenuButton>
      </div>
      <div class="donation-report">
        <Card 
          v-for="(card, index) in cards" 
          :key="index"
          :title="card.title" 
          :subtitle="card.subtitle" 
          :content="card.content"
        ></Card>
      </div>
      <div class="event-section">
        <div class="event-header">
          <h2>Donasi</h2>
          <button style="color: blue;" @click="toDonationList">See more</button>
        </div>
        <div class="overflow-x-auto flex flex-row">
          <div class="card-container" v-for="(event, index) in tenDonationEvents" :key="index">
            <ImageCard :title="event.subject"
            :thumbnail="event.thumbnail?event.thumbnail:'https://ionicframework.com/docs/img/demos/card-media.png'"
            :content="event.starts_on + ' - ' + event.ends_on">
            </ImageCard>
          </div>
        </div>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from "vue"
import { useRouter } from 'vue-router';
import { totalResource, totalJumatan, cards } from "@/data/donation/TotalDonation"
import { IonPage, IonContent, IonToolbar } from "@ionic/vue"
import MenuButton from "@/components/MenuButton.vue"
import ZakatIcon from "@/components/icons/ZakatIcon.svg"
import InfaqIcon from "@/components/icons/InfaqIcon.svg"
import HibahIcon from "@/components/icons/HibahIcon.svg"
import FidyahIcon from "@/components/icons/FidyahIcon.svg"
import RegularIcon from "@/components/icons/RegularIcon.svg"
import DonasiKhususIcon from "@/components/icons/DonasiKhususIcon.svg"
import Card from "@/components/Card.vue"
import Footer from "@/components/donor/Footer.vue"
import ImageCard from "../../components/ImageCard.vue"
import Header from "../../components/Header.vue"
import { eventResource, tenEvents, tenDonationEvents } from "@/data/event/EventList"

const menus = [
  { icon: ZakatIcon, label: 'Zakat', route: '/zakat' },
  { icon: InfaqIcon, label: 'Infaq', route: '/infaq' },
  { icon: HibahIcon, label: 'Hibah', route: '/hibah' },
  { icon: FidyahIcon, label: 'Kaffarat', route: '/kaffarat' },
  { icon: RegularIcon, label: 'Donatur', route: '/donatur-tetap' },
  { icon: DonasiKhususIcon, label: 'Donasi', route: '/donasi-khusus' },
];

const router = useRouter();

const toEventList = () => {
  router.push({ path: '/event' });
};

const toDonationList = () => {
  router.push({ path: '/donation' });
};
</script>

<style scoped>
.donation-report{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.event-section {
  display: flex;
  flex-direction: column;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

.card-container {
  flex: 0 0 auto; /* Tambahkan ini untuk menghindari perubahan lebar */
  width: 300px;
  height: auto;
}
</style>