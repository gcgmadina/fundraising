<template>
    <ion-page>
        <Header />
        <ion-content>
            <div class="p-4">
                <input type="text" v-model="searchQuery" placeHolder="Cari Surah" class="w-full p-2 border rounded">
            </div>
            <ion-list v-for="(surah, index) in filteredSurahList" :key="index">
                <CardListItem :title="surah.namaLatin" :subtitle="surah.arti" :status="true" :image="true"
                    @click="router.push({ name: 'Surah', params: { id: surah.nomor } })">
                    <template #status>
                        <div class="flex flex-col items-center">
                            <span class="text-lg font-semibold uthmanic">{{ surah.nama }}</span>
                            <span class="text-sm text-gray-500">{{ surah.jumlahAyat }} Ayat</span>
                        </div>
                    </template>
                    <template #image>
                        <NumberIcon :number="surah.nomor" color="#11a048"/>
                    </template>
                </CardListItem>
            </ion-list>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList } from "@ionic/vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import CardListItem from "@/components/CardListItem.vue";
import NumberIcon from "@/components/icons/NumberIcon.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { getSurahList } from "@/data/masjid/Quran";
import Fuse from "fuse.js";

const router = useRouter();
const surahList = ref([]);
const searchQuery = ref("");
let fuse;

const fetchSurahList = () => {
    getSurahList()
        .then((data) => {
            surahList.value = data;
            
            fuse = new Fuse(surahList.value, {
                keys: ['namaLatin'],
                threshold: 0.3,
            });
        })
        .catch((error) => {
            console.error("Error fetching surah list:", error);
        });
};

onMounted(() => {
    fetchSurahList();
});

watch(surahList, (newVal) => {
    if (newVal.length > 0) {
        fuse = new Fuse(newVal, {
            keys: ['namaLatin'],
            threshold: 0.3,
        });
    }
});

const filteredSurahList = computed(() => {
    if (!searchQuery.value || !fuse) {
        return surahList.value;
    }
    const result = fuse.search(searchQuery.value);
    return result.map(item => item.item);
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