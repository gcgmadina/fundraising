<template>
  <ion-page>
    <Header></Header>
    <ion-content>
      <div class="event-section">
        <div class="event-header">
          <h2>Kegiatan</h2>
          <button style="color: blue;" @click="toEventList">See more</button>
        </div>
        <div class="relative">
          <div ref="carousel1" class="overflow-x-auto flex flex-row">
            <div class="card-image-container" v-for="(event, index) in tenEvents" :key="index">
              <router-link :to="{ name: 'EventDetail', params: { id: event.name } }">
                <ImageCard :title="event.subject"
                  :thumbnail="event.event_thumbnail ? event.event_thumbnail : 'https://ionicframework.com/docs/img/demos/card-media.png'"
                  :content="event.starts_on">
                </ImageCard>
              </router-link>
            </div>
          </div>
          <button v-if="!isAtStart1" @click="scrollLeft('carousel1')"
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
            <img :src="SmallerIcon" alt="Scroll Left" class="w-6 h-6 rotate-180">
          </button>
          <button v-if="!isAtEnd1" @click="scrollRight('carousel1')"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
            <img :src="GreaterIcon" alt="Scroll Right" class="w-6 h-6">
          </button>
        </div>
      </div>
      <div class="menu-button-list flex justify-around items-center w-full mt-6">
        <div v-for="menu in menus" :key="menu.route">
          <MenuButton :icon="menu.icon" :label="menu.label" :route="menu.route"></MenuButton>
        </div>
      </div>
      <div class="accumulate-donation">
        <h2 class="px-6 py-0">Akumulasi Donasi</h2>
        <div class="donation-report flex overflow-x-auto">
          <div v-for="(card, index) in cards" :key="index" class="card-container flex-none">
            <Card :title="card.title" :subtitle="card.subtitle" :content="card.content"></Card>
          </div>
        </div>
      </div>
      <div class="event-section">
        <div class="event-header">
          <h2>Penggalangan Dana</h2>
          <button style="color: blue;" @click="toDonationList">See more</button>
        </div>
        <div class="relative">
          <div ref="carousel2" class="overflow-x-auto flex flex-row">
            <div class="card-image-container" v-for="(event, index) in tenDonationEvents" :key="index">
              <router-link :to="{ name: 'EventDetail', params: { id: event.name } }">
                <ImageCard :title="event.subject"
                  :thumbnail="event.event_thumbnail ? event.event_thumbnail : 'https://ionicframework.com/docs/img/demos/card-media.png'"
                  :content="event.starts_on + ' - ' + event.ends_on">
                </ImageCard>
              </router-link>
            </div>
          </div>
          <button v-if="!isAtStart2" @click="scrollLeft('carousel2')"
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
            <img :src="SmallerIcon" alt="Scroll Left" class="w-6 h-6 rotate-180">
          </button>
          <button v-if="!isAtEnd2" @click="scrollRight('carousel2')"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2">
            <img :src="GreaterIcon" alt="Scroll Right" class="w-6 h-6">
          </button>
        </div>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from 'vue-router';
import { cards } from "@/data/donation/TotalDonation"
import { IonPage, IonContent, IonToolbar } from "@ionic/vue"
import MenuButton from "@/components/MenuButton.vue"
import ZakatIcon from "@/components/icons/ZakatIcon.svg?raw"
import InfaqIcon from "@/components/icons/InfaqIcon.svg?raw"
import HibahIcon from "@/components/icons/HibahIcon.svg?raw"
import FidyahIcon from "@/components/icons/FidyahIcon.svg?raw"
import Card from "@/components/Card.vue"
import Footer from "@/components/donor/Footer.vue"
import ImageCard from "@/components/ImageCard.vue"
import Header from "@/components/Header.vue"
import { tenEvents, tenDonationEvents } from "@/data/event/EventList"
import SmallerIcon from "@/components/icons/smaller-than.svg"
import GreaterIcon from "@/components/icons/greater-than.svg"

const menus = [
  { icon: ZakatIcon, label: 'Zakat', route: 'Zakat' },
  { icon: InfaqIcon, label: 'Infaq', route: 'Infaq' },
  { icon: HibahIcon, label: 'Hibah', route: 'Hibah' },
  { icon: FidyahIcon, label: 'Kaffarat', route: 'Kaffarat' },
];

const router = useRouter();

const toEventList = () => {
  router.push({ name: 'EventList' });
};

const toDonationList = () => {
  router.push({ name: 'Donation' });
};

const carousel1 = ref(null);
const carousel2 = ref(null);
const isAtStart1 = ref(true);
const isAtEnd1 = ref(false);
const isAtStart2 = ref(true);
const isAtEnd2 = ref(false);

const updateArrows = (carouselRef, isAtStartRef, isAtEndRef) => {
  const scrollLeft = carouselRef.value.scrollLeft;
  const maxScrollLeft = carouselRef.value.scrollWidth - carouselRef.value.clientWidth;
  isAtStartRef.value = scrollLeft === 0;
  isAtEndRef.value = scrollLeft >= maxScrollLeft;
};

const scrollLeft = (carouselId) => {
  const carousel = carouselId === 'carousel1' ? carousel1.value : carousel2.value;
  carousel.scrollBy({
    left: -carousel.querySelector('.card-image-container').offsetWidth,
    behavior: 'smooth',
  });
};

const scrollRight = (carouselId) => {
  const carousel = carouselId === 'carousel1' ? carousel1.value : carousel2.value;
  carousel.scrollBy({
    left: carousel.querySelector('.card-image-container').offsetWidth,
    behavior: 'smooth',
  });
};

onMounted(() => {
  carousel1.value.addEventListener('scroll', () => updateArrows(carousel1, isAtStart1, isAtEnd1));
  carousel2.value.addEventListener('scroll', () => updateArrows(carousel2, isAtStart2, isAtEnd2));
  updateArrows(carousel1, isAtStart1, isAtEnd1);
  updateArrows(carousel2, isAtStart2, isAtEnd2);
});
</script>

<style scoped>
.donation-report {
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

.card-image-container {
  flex: 0 0 auto;
  width: 300px;
  height: auto;
}

.card-container {
  width: 190px;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
