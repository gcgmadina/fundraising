<template>
    <ion-page>
        <Header :showBackButton="true"></Header>
        <ion-content class="ion-padding">
            <img :src="discourseDetail.thumbnail" alt="Thumbnail" class="w-full mb-4">
            <p>{{ discourseDetail.time }}</p>
            <h1 class="font-bold">{{ discourseDetail.subject }}</h1>
            <h3 v-if="discourseDetail.speaker">bersama {{ discourseDetail.speaker }}</h3>
            <p v-if="discourseDetail.location">di {{ discourseDetail.location }}</p>
            <div v-html="discourseDetail.description" class="my-6"></div>
        </ion-content>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonPage, IonContent } from '@ionic/vue'
import { discourse } from '@/data/masjid/Discourse'
import { useRouter } from 'vue-router'

const router = useRouter()
const discourseDetail = ref({})

onMounted(() => {
    discourse.getDetail.fetch(router.currentRoute.value.params.id)
        .then(data => {
            discourseDetail.value = data
            console.log(discourseDetail.value)
        })
})
</script>