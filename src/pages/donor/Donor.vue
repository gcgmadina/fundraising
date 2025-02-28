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

      <div v-if="disc" class="relative w-4/5 mx-auto my-6"
        @click="router.push({ name: 'DiscourseDetail', params: { id: disc.name } })">
        <!-- Overlay untuk membuat gambar lebih gelap -->
        <div class="absolute inset-0 bg-black/50"></div>

        <!-- Gambar kajian -->
        <img :src="disc.thumbnail" alt="Gambar kajian" class="w-full h-auto object-cover">

        <!-- Tanggal di pojok kiri atas -->
        <p class="absolute top-2 left-2 text-white px-2 py-1 rounded z-10">
          {{ disc.time }}
        </p>

        <ion-button class="absolute top-2 right-2 px-3 py-1 rounded z-10" color="light" fill="outline" mode="ios"
          size="small" @click.stop="router.push({ name: 'DiscourseList' })">
          Jadwal Kajian</ion-button>

        <!-- Subject dan Speaker di pojok kiri bawah -->
        <div class="absolute bottom-2 left-2 text-white p-3 rounded z-10">
          <h2 class="text-lg font-bold">{{ disc.subject }}</h2>
          <p v-if="disc.speaker">{{ disc.speaker }}</p>
        </div>
      </div>

      <div class="accumulate-donation">
        <h2 class="px-6 py-0">Akumulasi Donasi</h2>
        <div class="menu-button-list flex justify-around items-center w-full mt-6">
          <div v-for="menu in menus" :key="menu.route">
            <MenuButton :icon="menu.icon" :label="menu.label" :route="menu.route"></MenuButton>
          </div>
        </div>
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
          <button style="color: blue;" @click="toFundraisingList">See more</button>
        </div>
        <div class="relative">
          <div ref="carousel2" class="overflow-x-auto flex flex-row">
            <div class="card-image-container" v-for="(fund, index) in fundraisingList" :key="index">
              <router-link :to="{ name: 'FundraisingDetail', params: { id: fund.name } }">
                <ion-card>
                  <img :src="fund.thumbnail" alt="https://ionicframework.com/docs/img/demos/card-media.png"
                    class="w-full h-[140px] object-cover">

                  <ion-card-header>
                    <ion-card-subtitle>Tersedia Rp. {{ formatCurrency(fund.income - fund.outcome) }}</ion-card-subtitle>
                    <ion-card-title>{{ fund.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    {{ fund.starts_on }} s/d {{ fund.ends_on }}
                  </ion-card-content>

                  <!-- Progress Bar -->
                  <div class="flex items-center justify-between px-4">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                      <div class="bg-blue-600 h-2.5 rounded-full"
                        :style="{ width: (fund.income / fund.goal * 100) + '%' }">
                      </div>
                    </div>

                  </div>
                </ion-card>
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
import { IonPage, IonContent, IonButton, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/vue"
import MenuButton from "@/components/MenuButton.vue"
import ZakatIcon from "@/components/icons/ZakatIcon.svg?raw"
import InfaqIcon from "@/components/icons/InfaqIcon.svg?raw"
import HibahIcon from "@/components/icons/HibahIcon.svg?raw"
import FidyahIcon from "@/components/icons/FidyahIcon.svg?raw"
import Card from "@/components/Card.vue"
import Footer from "@/components/donor/Footer.vue"
import ImageCard from "@/components/ImageCard.vue"
import Header from "@/components/Header.vue"
import SmallerIcon from "@/components/icons/smaller-than.svg"
import GreaterIcon from "@/components/icons/greater-than.svg"
import { getMosqueAddress, searchCity, fetchPrayerSchedule, getCurrentLocation, userPrayerSchedule } from "@/data/masjid/Address"
import _ from 'lodash';
import { fetchAllNews } from "@/data/masjid/News"
import { fundraising } from "@/data/donation/Fundraising"
import { formatCurrency } from "@/data/utils"
import { discourse } from "@/data/masjid/Discourse"

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

const fundraisingList = ref([]);
const disc = ref([]);

const toFundraisingList = () => {
  router.push({ name: 'FundraisingList' });
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

  fundraising.getList.fetch(
    { start: 0, length: 10 }
  )
    .then((data) => {
      fundraisingList.value = [...fundraisingList.value, ...data.data];
    })
    .catch((error) => {
      console.error('Error fetching fundraising list:', error);
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

  discourse.getList.fetch(
    { start: 0, length: 1 }
  )
    .then((data) => {
      disc.value = data.data[0];
    })
    .catch((error) => {
      console.error('Error fetching news:', error);
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
