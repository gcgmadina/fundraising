<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <div class="flex flex-col ">
                <img :src="news.thumbnail" alt="news thumbnail" class="mx-auto w-4/5">

                <h1 class="font-semibold text-blue-900 mb-8">{{ news.title }}</h1>
                <p class="mb-6 text-right">{{ news.uploaded_date }}, {{ news.uploaded_time }}</p>

            </div>
    
            <div v-html="news.content" class="text-lg"></div>
            <SuccsessModal :isModalOpen="isModalOpen" :validationSuccess="validationSuccess" :closeModal="closeModal"
                :successMessage="successMessage" :failureMessage="failureMessage" />
        </template>
        <template #footer>
            <div v-if="session.isLoggedIn && user.data && user.data.roles.includes('Non Profit Secretary')"
                class="px-4 flex flex-row justify-center gap-4">
                <ion-button expand="block" @click="deleteNews" color="danger">
                    Hapus Kegiatan
                </ion-button>
                <ion-button expand="block" @click="router.push({ name: 'NewsInput', params: { id: news.name } })"
                    color="primary">
                    Edit Kegiatan
                </ion-button>
            </div>
        </template>

    </BaseLayout>

</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { fetchNews } from '@/data/masjid/News';
import { deleteDocument } from '@/data/Document';
import SuccsessModal from '@/components/SuccessModal.vue';
import BaseLayout from '@/components/BaseLayout.vue';

const user = inject('$user');
const session = inject('$session');
const router = useRouter();

const news = ref({});

onMounted(() => {
    fetchNews(router.currentRoute.value.params.id).then((data) => {
        news.value = data;
    });
});

const deleteNews = () => {
    deleteDocument('Mosque News', router.currentRoute.value.params.id).then(() => {
        successMessage.value = 'Berita berhasil dihapus';
        validationSuccess.value = true;
        isModalOpen.value = true;
    }).catch(() => {
        failureMessage.value = 'Gagal menghapus berita';
        validationSuccess.value = false;
        isModalOpen.value = true;
    });
};

const isModalOpen = ref(false);
const validationSuccess = ref(false);
const successMessage = ref('');
const failureMessage = ref('');

const closeModal = () => {
    isModalOpen.value = false;

    if (validationSuccess.value) {
        router.back();
    }
};
</script>