<template>
    <ion-list>
        <ion-card v-for="(fund, index) in list" :key="index" @click="toFundraisingDetail(fund)" class="flex flex-row">
            <img :src=fund.thumbnail alt="Gambar penggalangan dana" class="w-1/5 mx-auto">
            <ion-card-content class="w-4/5 flex flex-col justify-between" mode="ios">
                <ion-card-title class="text-lg ">{{ fund.title }}</ion-card-title>
                <ion-card-subtitle>Terkumpul: <span class="text-blue-500">Rp. {{ formatCurrency(fund.income)
                        }}</span></ion-card-subtitle>
                <p>Diadakan {{ fund.starts_on }} s\d {{ fund.ends_on }}</p>

                <div class="flex items-center justify-between">
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-2">
                        <div class="bg-blue-600 h-2.5 rounded-full"
                            :style="{ width: (fund.income / fund.goal * 100) + '%' }">
                        </div>
                    </div>

                </div>
            </ion-card-content>
        </ion-card>

        <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
            <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
            </ion-infinite-scroll-content>
        </ion-infinite-scroll>
    </ion-list>
</template>

<script setup>
import { IonList, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from '@/data/utils';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();

const toFundraisingDetail = (fund) => {
    router.push({ name: 'FundraisingDetail', params: { id: fund.name } })
    fundraising.detail = fund
}

const loadDisabled = ref(false);
let startIndex = ref(10);
const list = ref([]);

const loadData = async (event) => {
    await fundraising.getList.fetch({
        start: startIndex.value,
        length: 10
    }).then((response) => {
        if (response) {
            loadDisabled.value = response;
            list.value = [...list.value, ...response.data];
        } else {
            list.value = [...list.value, ...response.data];
            startIndex.value += 10; // Tambahkan offset untuk data berikutnya
        }
        event.target.complete();
    }).catch(() => {
        event.target.complete();
    });
}

onMounted(() => {
    fundraising.getList.fetch(
        { start: 0, length: 10 }
    ).then((response) => {
        list.value = [...list.value, ...response.data];
    });
})
</script>