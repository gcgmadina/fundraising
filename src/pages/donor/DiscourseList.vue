<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <h1 class="font-bold text-violet-900">Jadwal Kajian</h1>
            <ion-list>
                <ion-card v-for="(discourse, index) in list" :key="index"
                    @click="router.push({ name: 'DiscourseDetail', params: { id: discourse.name } })"
                    class="flex flex-row">
                    <img :src=discourse.thumbnail alt="Gambar penggalangan dana" class="w-1/5 mx-auto">
                    <ion-card-content class="w-4/5 flex flex-col justify-between" mode="ios">
                        <ion-card-title class="text-lg ">{{ discourse.subject }}</ion-card-title>
                        <p v-if="discourse.speaker">Bersama {{ discourse.speaker }}</p>
                        <ion-card-subtitle>{{ discourse.time }}</ion-card-subtitle>
                    </ion-card-content>
                </ion-card>

                <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                    </ion-infinite-scroll-content>
                </ion-infinite-scroll>
            </ion-list>
        </template>
    </BaseLayout>
</template>

<script setup>
import { IonList, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue'
import { discourse } from '@/data/masjid/Discourse'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'

const router = useRouter()
const start = ref(0)
const list = ref([])
const loadDisabled = ref(false)

const loadData = async (event) => {
    await discourse.getList.fetch({ start: start.value, length: 10 })
        .then((response) => {
            if (response.stop) {
                loadDisabled.value = response
                list.value = [...list.value, ...response.data]
            } else {
                list.value = [...list.value, ...response.data]
                start.value += 10
            }
            event.target.complete()
        })
}

onMounted(async () => {
    await discourse.getList.fetch({ start: start.value, length: 10 })
        .then((response) => {
            list.value = response.data
            start.value += 10
        })
})
</script>