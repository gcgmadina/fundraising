<template>
    <ion-menu side="end" content-id="main-content" type="push" ref="menu">
        <ion-header>
            <ion-toolbar>
                <ion-title slot="start">Pengaturan</ion-title>
                <ion-button slot="end" fill="clear" @click="closeMenu">
                    <component :is="CloseIcon" class="h-5 w-5" />
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div class="flex flex-col justify-right space-y-6 py-2">
                <ion-toggle
                  v-model="showArabic"
                  :checked="true"
                  :enable-on-off-labels="true"
                  color="success"
                  @ionChange="handleArabicChange"
                >
                  Arab
                </ion-toggle>
                <ion-toggle
                  v-model="showLatin"
                  :checked="true"
                  :enable-on-off-labels="true"
                  color="success"
                  @ionChange="handleLatinChange"
                >
                  Latin
                </ion-toggle>
                <ion-toggle
                  v-model="showTranslation"
                  :checked="true"
                  :enable-on-off-labels="true"
                  color="success"
                >
                  Terjemahan
                </ion-toggle>
              </div>
            <p class="text-red-500 text-xs py-4">*Salah satu dari arab dan latin akan tetap aktif</p>
        </ion-content>
    </ion-menu>

    <ion-page id="main-content">
        <Header :title="surahContent.namaLatin + ': ' + surahContent.nomor" :showBackButton="true">
            <template #end>
                <ion-menu-button></ion-menu-button>
            </template>
        </Header>
        <ion-content class="ion-padding">
            <h1 v-if="!(route.params.id == 1 || route.params.id==9)" class="text-center uthmanic">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ </h1>

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
                        <div v-if="showArabic" class="text-right my-2 text-3xl uthmanic">{{ ayat.teksArab }}</div>
                        <div v-if="showLatin" class="text-left my-3 italic">{{ ayat.teksLatin }}</div>
                        <div v-if="showTranslation" class="text-left my-3">{{ ayat.teksIndonesia }}</div>
                    </div>
                </ion-item>
            </ion-list>
        </ion-content>

        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem, IonButton, IonMenu, IonToolbar, IonTitle, IonHeader, IonMenuButton, IonToggle } from "@ionic/vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSurahContent } from "@/data/masjid/Quran";
import NumberIcon from "@/components/icons/NumberIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

const route = useRoute();
const surahContent = ref({ ayat: [] });
const showLatin = ref(true);
const showTranslation = ref(true);
const showArabic = ref(true);

const fetchSurahContent = async (surahNumber) => {
    try {
        const data = await getSurahContent(surahNumber);
        surahContent.value = data;
    } catch (error) {
        console.error("Error fetching surah content:", error);
    }
};

const handleArabicChange = () => {
  if (!showArabic.value && !showLatin.value) {
    showLatin.value = true;
  }
};

const handleLatinChange = () => {
  if (!showLatin.value && !showArabic.value) {
    showArabic.value = true;
  }
};

const menu = ref();

const closeMenu = () => {
    menu.value.$el.setOpen(false);
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