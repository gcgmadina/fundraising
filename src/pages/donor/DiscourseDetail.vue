<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <img :src="discourseDetail.thumbnail" alt="Thumbnail" class="w-full mb-4">
            <div id="title" class="mb-8">
                <h1 class="font-bold text-blue-900">{{ discourseDetail.subject }}</h1>
                <h3 v-if="discourseDetail.speaker">bersama {{ discourseDetail.speaker }}</h3>
                <p v-if="discourseDetail.location">di {{ discourseDetail.location }}</p>
            </div>
            <p class="text-right">{{ formatDateTime(discourseDetail.time) }}</p>
            <div v-html="discourseDetail.description" class="my-6"></div>
        </template>
        <template #footer>
            <ion-button color="danger" @click="deleteDiscourse">Hapus</ion-button>
        </template>
    </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import { discourse } from '@/data/masjid/Discourse'
import { useRouter } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'
import { formatDateTime } from '@/data/DateUtils'

const router = useRouter()
const discourseDetail = ref({})

onMounted(() => {
    discourse.getDetail.fetch(router.currentRoute.value.params.id)
        .then(data => {
            discourseDetail.value = data
        })
})

const deleteDiscourse = () => {
    discourse.delete.submit(router.currentRoute.value.params.id)
        .then(() => {
            router.push({ name: 'DonorHome' })
        })
}
</script>