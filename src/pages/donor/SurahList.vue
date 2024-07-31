<template>
    <ion-page>
        <Header />
        <ion-content>
            <ion-list v-for="(surah, index) in surahList" :key="index">
                <CardListItem 
                    :title="surah.namaLatin" 
                    :subtitle="surah.arti" 
                    :status="true" 
                    :image="true"
                    @click="router.push({ name: 'Surah', params: { id: surah.nomor } })"
                >
                    <template #status>
                        <div class="flex flex-col items-center">
                            <span class="text-lg font-semibold">{{ surah.nama }}</span>
                            <span class="text-sm text-gray-500">{{ surah.jumlahAyat }} Ayat</span>
                        </div>
                    </template>
                    <template #image>
                        <NumberIcon :number="surah.nomor" />
                    </template>
                </CardListItem>
            </ion-list>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonList, IonItem } from "@ionic/vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/donor/Footer.vue";
import CardListItem from "@/components/CardListItem.vue";
import NumberIcon from "@/components/icons/NumberIcon.vue";
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { getSurahList } from "@/data/quran/Quran";

const router = useRouter();
const surahList = ref([]);

const fetchSurahList = () => {
    getSurahList()
        .then((data) => {
            surahList.value = data;
        })
        .catch((error) => {
            console.error("Error fetching surah list:", error);
        });
};

onMounted(() => {
    fetchSurahList();
});
</script>