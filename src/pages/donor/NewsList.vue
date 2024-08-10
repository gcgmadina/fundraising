<template>
    <ion-page>
        <Header></Header>
        <ion-content >
            <ion-list>
                <ion-item v-for="(news, index) in news">
                    <CardListItem
                        :key="index"
                        :title="news.title"
                        :subtitle="news.uploaded_date"
                        :image="news.thumbnail"
                        @click="router.push({ name: 'News', params: { id: news.name } })"
                    />

                </ion-item>
            </ion-list>
        </ion-content>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem } from "@ionic/vue"
import { fetchAllNews } from "@/data/masjid/News.js"
import Header from "@/components/Header.vue"
import Footer from "@/components/donor/Footer.vue"
import CardListItem from "@/components/CardListItem.vue"
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const news = ref([]);
const router = useRouter();

onMounted(() => {
    fetchAllNews().then((response) => {
        console.log(response);
        news.value = response;
    });
});
</script>