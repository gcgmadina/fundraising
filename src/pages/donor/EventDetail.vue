<template>
    <ion-page>
        <Header/>
        <ion-content>
            <!-- Skeleton Screen untuk Thumbnail dengan Tailwind CSS -->
            <div v-if="loading" class="w-full h-48 bg-gray-300 animate-pulse"></div>
            <!-- Konten asli ditampilkan ketika data sudah dimuat -->
            <div v-else class="w-full h-auto">
                <img alt="Silhouette of mountains" :src="event.thumbnail" class="w-full h-auto"/>
                <div class="p-4 border-b-2 border-gray-500">
                    <h1 class="font-bold">{{ event.subject }}</h1>
                    <p class="text-gray-500">Mulai: {{ event.starts_on }}</p>
                    <p v-if="event.ends_on" class="text-gray-500">Sampai: {{ event.ends_on }}</p>
                </div>
                <div class="p-4">
                    <h4 class="font-bold mb-5">Deskripsi Kegiatan</h4>
                    <p v-html="event.description" class="my-4"></p>
                </div>
            </div>
        </ion-content>
        <Footer/>
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { createResource } from 'frappe-ui';
import { IonPage, IonContent } from '@ionic/vue';

const router = useRouter();
const event = ref({ thumbnail: '' });
const loading = ref(true); // Menambahkan state loading

const eventDetail = createResource({
    method: "GET",
    url: "non_profit.api.fundraising.get_event_by_id",
    auto: true,
    realtime: true,
    params: {
        event_id: router.currentRoute.value.params.id
    },
    transform(data) {
        event.value = data;
        loading.value = false; // Data telah dimuat
        console.log(data);
    }
});

onMounted(() => {
    eventDetail.reload();
});
</script>
