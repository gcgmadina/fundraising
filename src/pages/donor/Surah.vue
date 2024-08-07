<template>
    <ion-page>
        <Header :title="surahContent.namaLatin + ': ' + surahContent.nomor" :showBackButton="true" />
        <ion-content class="ion-padding">
            <h1 class="text-center">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ </h1>

            <ion-list>
                <ion-item 
                    v-for="ayat in surahContent.ayat" 
                    :key="ayat.nomorAyat" 
                    class="flex items-start my-2 space-y-4"
                >
                    <div class="flex justify-center w-2/12">
                        <component :is="NumberIcon" :number="ayat.nomorAyat" class="w-10 h-10" />
                    </div>
                    <div class="w-10/12">
                        <div class="text-right my-2 text-3xl">{{ ayat.teksArab }}</div>
                        <div v-if="showLatin" class="text-left my-3 italic">{{ ayat.teksLatin }}</div>
                        <div v-if="showTranslation" class="text-left my-3">{{ ayat.teksIndonesia }}</div>
                    </div>
                </ion-item>
            </ion-list>
        </ion-content>

        <div class="flex justify-center space-x-6 py-2 border-t-2 border-slate-500">
            <ion-button 
                @click="toggleLatin" 
                size="small" 
                fill="outline"
                :color="showLatin ? 'success' : 'medium'"
            >
                Latin
            </ion-button>
            <ion-button 
                @click="toggleTranslation" 
                size="small" 
                fill="outline"
                :color="showTranslation ? 'success' : 'medium'"
            >
                Terjemahan
            </ion-button>
        </div>

        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem, IonButton } from "@ionic/vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSurahContent } from "@/data/masjid/Quran";
import NumberIcon from "@/components/icons/NumberIcon.vue";

const route = useRoute();
const surahContent = ref({ ayat: [] });
const showLatin = ref(true);
const showTranslation = ref(true);

const fetchSurahContent = async (surahNumber) => {
    try {
        const data = await getSurahContent(surahNumber);
        surahContent.value = data;
    } catch (error) {
        console.error("Error fetching surah content:", error);
    }
};

const toggleLatin = () => {
    showLatin.value = !showLatin.value;
};

const toggleTranslation = () => {
    showTranslation.value = !showTranslation.value;
};

onMounted(() => {
    fetchSurahContent(route.params.id);
});
</script>
