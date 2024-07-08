<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <!-- Skeleton Screen untuk Thumbnail dengan Tailwind CSS -->
            <div v-if="loading" class="w-full h-48 bg-gray-300 animate-pulse"></div>
            <!-- Konten asli ditampilkan ketika data sudah dimuat -->
            <div v-else class="w-full h-auto">
                <img alt="Silhouette of mountains" :src="event.event_thumbnail" class="w-full h-auto" />
                <div class="p-4 border-b-2 border-gray-500">
                    <h1 class="font-bold">{{ event.subject }}</h1>
                    <p class="text-gray-500">Mulai: {{ event.starts_on }}</p>
                    <p v-if="event.ends_on" class="text-gray-500">Sampai: {{ event.ends_on }}</p>
                </div>
                <div class="p-4">
                    <h4 class="font-bold mb-5">Deskripsi Kegiatan</h4>
                    <p v-html="event.description" class="my-4"></p>
                </div>
                <div v-if="event.is_donation_event" class="px-2">
                    <ion-button expand="block" @click="navigate">Donasi Sekarang</ion-button>
                </div>
            </div>
        </ion-content>
        <ion-button v-if="session.isLoggedIn && user.data && user.data.roles.includes('Non Profit Secretary')"
            expand="block" @click="deleteEvent" color="danger">
            Hapus Kegiatan
        </ion-button>
        <Footer />

        <!-- Modal untuk menampilkan pesan -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="flex flex-col justify-center bg-white p-6 rounded shadow-lg w-80">
                <component :is="deleteSuccess ? SuccessIcon : FailedIcon" class="w-20 h-20 mx-auto mb-4" />
                <p v-if="deleteSuccess" class="font-bold text-center text-2xl">Sukses!</p>
                <p v-else class="font-bold text-center text-2xl">Gagal!</p>
                <p class="text-center mb-4">
                    {{ message }}
                </p>
                <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded">Tutup</button>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { createResource } from 'frappe-ui';
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { deleteDocument } from '@/data/Document';
import SuccessIcon from '@/components/icons/SuccessIcon.vue';
import FailedIcon from '@/components/icons/FailedIcon.vue';

const user = inject('$user');
const session = inject('$session');
const router = useRouter();
const event = ref({ thumbnail: '' });
const loading = ref(true); // Menambahkan state loading
const message = ref(''); // Menambahkan state message
const deleteSuccess = ref(false); // Menambahkan state deleteSuccess
const showModal = ref(false); // Menambahkan state showModal

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
        // console.log(data);
    }
});

const deleteEvent = async () => {
    try {
        const result = await deleteDocument('Event', event.value.name);
        message.value = "Kegiatan berhasil dihapus.";
        deleteSuccess.value = true;
        showModal.value = true;
    } catch (error) {
        message.value = "Gagal menghapus kegiatan.";
        deleteSuccess.value = false;
        showModal.value = true;
    }
};

const closeModal = () => {
    showModal.value = false;
    if (deleteSuccess.value) {
        router.push({ name: 'DonorHome' });
    }
};

onMounted(() => {
    eventDetail.reload();
});

const navigate = () => {
    router.push({ name: 'SpecificDonation', params: { id: event.name } });
};
</script>
