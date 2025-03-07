<template>
    <BaseLayout>
        <template #content>
            <div class="border-2 my-4"></div>
            <div class="flex flex-row items-center justify-between px-4 mb-4">
                <Star :number="surahContent.nomor" class="h-12 w-12"/>
                <div class="flex flex-col items-end">
                    <h2 class="font-bold text-violet-900">{{ surahContent.namaLatin }}</h2>
                    <p class="text-gray-500">{{ surahContent.arti }}</p>
                </div>
            </div>

            <IonList>
                <ion-item v-for="ayat in surahContent.ayat" :key="ayat.nomorAyat"
                    class="flex items-start my-2 space-y-4">
                    <div class="flex justify-center w-1/5 py-2">   
                        <div
                            class="mt-6 text-2xl px-4 py-1 border-2 border-violet-900 rounded-full text-violet-900 font-bold text-sm flex items-center justify-center">
                            {{ ayat.nomorAyat.toLocaleString('ar-EG') }}
                        </div>
                    </div>
                    <div class="w-4/5">
                        <div class="text-right
                            my-2 text-3xl uthmanic">{{ ayat.teksArab }}</div>
                        <div class="text-left my-3 italic">{{ ayat.teksLatin }}</div>
                        <div class="text-left my-3">{{ ayat.teksIndonesia }}</div>
                    </div>
                </ion-item>
            </IonList>
        </template>
    </BaseLayout>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem, IonButton, IonMenu, IonToolbar, IonTitle, IonHeader, IonMenuButton, IonToggle } from "@ionic/vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSurahContent } from "@/data/masjid/Quran";
import BaseLayout from "@/components/BaseLayout.vue";
import Star from "@/components/icons/Star.vue";

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

<style scoped>
@font-face {
    font-family: "UthmanicHafs";
    src: url("@/components/fonts/LPMQ IsepMisbah.ttf");
}

.uthmanic {
    font-family: "UthmanicHafs";
    line-height: normal !important;

}
</style>