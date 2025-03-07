<template>
    <BaseLayout>
        <template #content>
            <h3 class="font-bold text-violet-900">Quran</h3>
            <ion-searchbar placeholder="Cari Surah" mode="md" v-model="searchQuery"></ion-searchbar>
            <div class="border-2 my-6"></div>

            <ion-list>
                <ion-item v-for="(surah, index) in filteredSurahList" :key="index"
                    @click="router.push({ name: 'Surah', params: { id: surah.nomor } })">
                    <ion-label class="flex flex-row border-2 p-2 rounded-lg">
                        <div class="flex flex-row items-center justify-between px-4">
                            <Star :number="surah.nomor" />
                            <div class="flex flex-col items-center">
                                <h2 class="font-bold text-violet-900">{{ surah.namaLatin }}</h2>
                                <p class="text-gray-500">{{ surah.arti }}</p>
                            </div>
                            <ion-icon :icon="chevronForward" slot="end" size="large" color="tertiary"></ion-icon>
                        </div>
                    </ion-label>
                </ion-item>
            </ion-list>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { IonList, IonItem, IonLabel, IonIcon, IonSearchbar } from '@ionic/vue';
import { chevronForward } from 'ionicons/icons';
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getSurahList } from '@/data/masjid/Quran';
import Fuse from "fuse.js";
import Star from '@/components/icons/Star.vue';

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