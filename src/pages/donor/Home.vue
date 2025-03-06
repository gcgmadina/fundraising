<template>
    <BaseLayout>
        <template #content>
            <div class="flex flex-col">
                <h3 class="font-bold text-violet-900">Berita Terbaru</h3>
                <Carousel>
                    <div class="flex-none w-[300px] h-auto" v-for="fund in fundraisingList" :key="fundraising.id">
                        <router-link :to="{ name: 'FundraisingDetail', params: { id: fund.name } }">
                            <ion-card>
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
import { fundraising } from "@/data/donation/Fundraising"
import { ref, onMounted } from "vue";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/vue"
import { formatCurrency } from "@/data/utils"

const fundraisingList = ref([]);

onMounted(async () => {
    await fundraising.getList.fetch({ start: 0, length: 10 });
    fundraisingList.value = fundraising.getList.data.data;
});
</script>