<template>
    <ion-page>
        <Header 
            :title="surahContent.namaLatin + ': ' + surahContent.nomor"
            :showBackButton="true"
        />
        <ion-content class="ion-padding">
            <h1 class="text-center"> ﷽ </h1>
            <ion-list>
                <ion-item v-for="ayat in surahContent.ayat" :key="ayat.nomorAyat" class="flex items-start">
                    <div class="flex justify-center w-2/12">
                        <component :is="NumberIcon" :number="ayat.nomorAyat" class="w-10 h-10" />
                    </div>
                    <div class="w-10/12">
                        <div class="text-right my-2">{{ ayat.teksArab }}</div>
                        <div class="text-left my-3">{{ ayat.teksIndonesia }}</div>
                    </div>
                </ion-item>
            </ion-list>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem, IonTitle, IonToolbar, IonHeader, IonBackButton, IonButtons } from "@ionic/vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSurahContent } from "@/data/quran/Quran";
import NumberIcon from "@/components/icons/NumberIcon.vue";

const route = useRoute();
const surahContent = ref({ ayat: [] });

const fetchSurahContent = async (surahNumber) => {
    try {
        const data = await getSurahContent(surahNumber);
        surahContent.value = data;
    } catch (error) {
        console.error("Error fetching surah content:", error);
    }
};

onMounted(() => {
    fetchSurahContent(route.params.id);
});
</script>