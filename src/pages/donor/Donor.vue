<template>
  <ion-page>
    <Header></Header>
    <ion-content>
      <div class="hero-section relative w-full max-h-full overflow-hidden">
        <!-- Gambar -->
        <img v-if="address && address.image" :src="address.image" alt="Gambar Masjid"
          class="brightness-50 w-full h-full object-cover object-center">
        <img v-else src="@/components/icons/masjid_nabawi.webp" alt="Masjid Nabawi"
          class="brightness-50 w-full h-full object-cover object-center">

        <!-- Tulisan di atas gambar -->
        <!-- <div class="absolute inset-0 flex items-center justify-center flex-col">
          <h1 v-if="address && address.address_title" class="text-white font-bold text-center w-4/5">
            {{ address.address_title }}
          </h1>
          <h1 v-else class="text-white font-bold text-center w-4/5">
            Pantau Kegiatan dan Keuangan Masjid Secara Transparan
          </h1>
          <h3 class="text-white font-bold w-4/5 text-center">
            Menyatukan Hati, Menggapai Ridha Ilahi
          </h3>
        </div> -->

        <div class="absolute inset-0 flex items-end justify-center">
          <div class="flex flex-col items-center w-full pb-6">
            <h1 v-if="address && address.address_title" class="text-white font-bold text-center w-4/5 mb-1">
              {{ address.address_title }}
            </h1>
            <h1 v-else class="text-white font-bold text-center w-4/5">
              Pantau Kegiatan dan Keuangan Masjid Secara Transparan
            </h1>
            <h3 class="text-white font-bold w-4/5 text-center mt-2">
              Menyatukan Hati, Menggapai Ridha Ilahi
            </h3>
          </div>
        </div>
      </div>


      <div class="event-section">
        <div class="event-header">
          <h2>Berita Terkini</h2>
          <button style="color: blue;" @click="toNewsList">See more</button>
        </div>
        <div class="relative">
          <div ref="carousel1" class="overflow-x-auto flex flex-row">
            <div class="card-image-container" v-for="(news, index) in news" :key="index">
              <router-link :to="{ name: 'News', params: { id: news.name } }">
                <ImageCard :title="news.title"
                  :thumbnail="news.thumbnail ? news.thumbnail : 'https://ionicframework.com/docs/img/demos/card-media.png'"
                  :content="news.uploaded_date">
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
      <div id="Schedule-section" v-if="address || schedule">
        <div class="event-header">
          <h2 v-if="!userLocation">Jadwal Sholat {{ _.startCase(_.toLower(address.city)) }}</h2>
          <h2 v-else>Jadwal Sholat Hari Ini</h2>
        </div>
        <div class="prayer-schedule my-2">
          <div v-for="(schedule, index) in schedule" :key="index" class="flex justify-center">
            <div class="grid grid-cols-2 my-1 text-green-600">
              <div>{{ schedule.waktu }}</div>
              <div class="pl-10">{{ schedule.jam }} WIB</div>
            </div>
          </div>
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
            <Card :title="card.title" :subtitle="card.subtitle" :content="card.content"
              @click="donationCard(card.subtitle)"></Card>
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
import { ref, onMounted, inject } from "vue"
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
import { getMosqueAddress, searchCity, fetchPrayerSchedule, getCurrentLocation, userPrayerSchedule } from "@/data/masjid/Address"
import _ from 'lodash';
import { fetchAllNews } from "@/data/masjid/News"

const news = ref([]);

const menus = [
  { icon: ZakatIcon, label: 'Zakat', route: 'Zakat' },
  { icon: InfaqIcon, label: 'Infaq', route: 'Infaq' },
  { icon: HibahIcon, label: 'Hibah', route: 'Hibah' },
  { icon: FidyahIcon, label: 'Fidyah', route: 'Fidyah' },
];

const router = useRouter();
const user = inject('$user');
const session = inject('$session');
const address = ref(null);
const schedule = ref();
const userLocation = ref();

const toNewsList = () => {
  router.push({ name: 'NewsList' });
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

const donationCard = (type) => {
  if (session.isLoggedIn && user.data && user.data.roles.includes('Non Profit Accounting')) {
    router.push({ name: 'HistoryWithType', params: { donation_type: type } });

  }
};

const scheduleNameTime = (data) => {
  return [
    { waktu: 'Subuh', jam: data.subuh },
    { waktu: 'Terbit', jam: data.terbit },
    { waktu: 'Dzuhur', jam: data.dzuhur },
    { waktu: 'Ashar', jam: data.ashar },
    { waktu: 'Maghrib', jam: data.maghrib },
    { waktu: 'Isya', jam: data.isya },
  ];
};

onMounted(() => {
  carousel1.value.addEventListener('scroll', () => updateArrows(carousel1, isAtStart1, isAtEnd1));
  carousel2.value.addEventListener('scroll', () => updateArrows(carousel2, isAtStart2, isAtEnd2));
  updateArrows(carousel1, isAtStart1, isAtEnd1);
  updateArrows(carousel2, isAtStart2, isAtEnd2);

  fetchAllNews()
    .then((data) => {
      news.value = data;
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
    });

  getMosqueAddress()
    .then((data) => {
      address.value = data;

      return getCurrentLocation();
    })
    .then((data) => {
      userLocation.value = data;
      return userPrayerSchedule(data.latitude, data.longitude);
    })
    .then((data) => {
      schedule.value = scheduleNameTime(data);
    })
    .catch((error) => {
      console.error('Error getting user prayer schedule or current location:', error);

      if (address.value && address.value.city) {
        searchCity(address.value.city)
          .then((data) => {
            return data[0].id;
          })
          .then((cityId) => {
            return fetchPrayerSchedule(cityId);
          })
          .then((data) => {
            schedule.value = scheduleNameTime(data.data.jadwal);
          })
          .catch((error) => {
            console.error('Error fetching prayer schedule:', error);
          });
      } else {
        console.error('Error: Address city is not available.');
      }
    });
});

</script>

<style scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

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
