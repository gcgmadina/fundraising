<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content class="ion-padding">
            <div class="flex flex-col justify-center text-center mb-8">
                <h1 class="font-semibold">{{news.title}}</h1>
                <p class="mb-6">{{ news.uploaded_date }}, {{ news.uploaded_time }}</p>

                <img :src="news.thumbnail" alt="news thumbnail">
            </div>

            <div v-html="news.content"></div>

        </ion-content>
        <ion-button v-if="session.isLoggedIn && user.data && user.data.roles.includes('Non Profit Secretary')"
            expand="block" @click="deleteNews" color="danger" class="px-4">
            Hapus Kegiatan
        </ion-button>

        <SuccsessModal 
            :isModalOpen="isModalOpen" 
            :validationSuccess="validationSuccess" 
            :closeModal="closeModal"
            :successMessage="successMessage"
            :failureMessage="failureMessage"
        />

        <Footer/>
    </ion-page>
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