<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <h1 class="font-bold text-violet-900">Daftar Berita Terbaru</h1>
            <ion-list>
                    <CardListItem
                        v-for="(news, index) in news"
                        :key="index"
                        :title="news.title"
                        :subtitle="news.uploaded_date"
                        :image="news.thumbnail"
                        @click="router.push({ name: 'News', params: { id: news.name } })"
                    />
            </ion-list>
            
            <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </template>
    </BaseLayout>
</template>

<script setup>
import { IonList, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/vue"
import { fetchAllNews } from "@/data/masjid/News.js"
import CardListItem from "@/components/CardListItem.vue"
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseLayout from "@/components/BaseLayout.vue"

const news = ref([]);
const router = useRouter();

onMounted(() => {
    fetchAllNews().then((response) => {
        news.value = response;
    });
});

const start = ref(10);
const length = ref(10);
const loadDisabled = ref(false);

const loadData = (event) => {
    fetchAllNews(start.value, length.value).then((response) => {
        news.value.push(...response);
        start.value += length.value;
        if (response.length == 0) {
            loadDisabled.value = true;
        }
        event.target.complete();
    });
}
</script>