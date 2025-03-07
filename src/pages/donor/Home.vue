<template>
    <BaseLayout>
        <template #content>
            <!-- Menu Section -->
            <MenuList></MenuList>

            <!-- Discourse section -->
            <div class="flex flex-col">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-violet-900">Kajian Islami</h3>
                    <button class="text-violet-600 hover:text-violet-800 font-medium" @click="router.push({ name: 'DiscourseList' })">Selengkapnya ></button>
                </div>
                <img :src="course.thumbnail" alt="Gambar kajian" class="w-full max-h-[300px] object-cover rounded-lg my-4" @click="router.push({ name: 'DiscourseDetail', params: { id: course.name } })">
            </div>

            <!-- News section -->
            <div class="flex flex-col">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-violet-900">Berita Terbaru</h3>
                    <button class="text-violet-600 hover:text-violet-800 font-medium" @click="router.push({ name: 'NewsList' });">Selengkapnya ></button>
                </div>
                <Carousel>
                    <div class="flex-none w-[300px] h-auto" v-for="news in newsList" :key="news.name">
                        <router-link :to="{ name: 'News', params: { id: news.name } }">
                            <ion-card mode="md">
                                <img :src="news.thumbnail"
                                    alt="https://ionicframework.com/docs/img/demos/card-media.png"
                                    class="w-full h-[140px] object-cover">

                                <ion-card-header>
                                    <ion-card-title>{{ news.title }}</ion-card-title>
                                    <ion-card-subtitle class="flex justify-between">
                                        {{ news.uploaded_date }}
                                    </ion-card-subtitle>
                                </ion-card-header>
                            </ion-card>
                        </router-link>
                    </div>
                </Carousel>
            </div>

            <!-- fundraising section -->
            <div class="flex flex-col">
                <div class="flex justify-between items-center">
                    <h3 class="font-bold text-violet-900">Penggalangan Dana</h3>
                    <button class="text-violet-600 hover:text-violet-800 font-medium" @click="router.push({ name: 'FundraisingList' });">Selengkapnya ></button>
                </div>
                <Carousel>
                    <div class="flex-none w-[300px] h-auto" v-for="fund in fundraisingList" :key="fund.name">
                        <router-link :to="{ name: 'FundraisingDetail', params: { id: fund.name } }">
                            <ion-card mode="md">
                                <img :src="fund.thumbnail"
                                    alt="https://ionicframework.com/docs/img/demos/card-media.png"
                                    class="w-full h-[140px] object-cover">

                                <ion-card-header>
                                    <ion-card-title>{{ fund.title }}</ion-card-title>
                                    <ion-card-subtitle class="flex justify-between">
                                        <span class="font-bold text-violet-900">Rp. {{ formatCurrency(fund.income)
                                            }}</span>
                                        <span>Rp. {{ formatCurrency(fund.goal) }}</span>
                                    </ion-card-subtitle>
                                </ion-card-header>

                                <!-- Progress Bar -->
                                <div class="flex items-center justify-between px-4">
                                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-100 my-2">
                                        <div class="bg-yellow-600 h-2.5 rounded-full"
                                            :style="{ width: (fund.income / fund.goal * 100) + '%' }">
                                        </div>
                                    </div>

                                </div>
                                <ion-card-content>
                                    {{ fund.starts_on }} - {{ fund.ends_on }}
                                </ion-card-content>
                            </ion-card>
                        </router-link>
                    </div>
                </Carousel>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/components/BaseLayout.vue";
import Carousel from "@/components/Carousel.vue";
import MenuList from "@/components/MenuList.vue";
import { fetchAllNews } from "@/data/masjid/News"
import { fundraising } from "@/data/donation/Fundraising"
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/vue"
import { formatCurrency } from "@/data/utils"
import { discourse } from "@/data/masjid/Discourse";

const router = useRouter();

const fundraisingList = ref([]);
const newsList = ref([]);
const course = ref({});

onMounted(async () => {
    await fundraising.getList.fetch({ start: 0, length: 10 });
    fundraisingList.value = fundraising.getList.data.data;

    newsList.value = await fetchAllNews()

    await discourse.getList.fetch();
    course.value = discourse.getList.data.data[0];
});
</script>