<template>
    <BaseLayout>
        <template #content>
            <h1 class="font-semibold text-violet-900">Berita</h1>
            <ion-card v-for="news in allNews" class="flex justify-between items-center p-4" mode="md">
                <ion-card-header class="w-[40%]">
                    <ion-card-title class="text-violet-800 font-medium overflow-hidden  text-ellipsis line-clamp-2">
                        {{ news.title }}
                    </ion-card-title>
                </ion-card-header>
                <p>{{ news.uploaded_date }}</p>
                <div class="flex flex-col">
                    <ion-button color="warning" mode="md" size="small"
                        @click="router.push({ name: 'NewsInput', params: { id: news.name } })">
                        <ion-icon :icon="create" slot="start" color="light"></ion-icon>
                        <p class="text-white normal-case">
                            Edit
                        </p>
                    </ion-button>
                    <ion-button color="danger" mode="md" size="small" @click="openDeleteModal(news)">
                        <ion-icon :icon="trashBin" slot="start"></ion-icon>
                        <p class="text-white normal-case">
                            Hapus
                        </p>
                    </ion-button>
                </div>
            </ion-card>

            <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>

            <ion-modal :is-open="deleteModal" :initial-breakpoint=".3" :breakpoints="[0, .25, .3, .5, 0.8, 1]"
                backdropDismiss="true" @didDismiss="closeDeleteModal">
                <div class="p-4">
                    <h2>Apakah Anda yakin ingin menghapus berita dengan judul:
                        <p class="text-basic text-gray-700">{{ newsToDelete?.title }}</p> ?
                    </h2>
                    <div class="flex justify-end gap-2 my-4">
                        <ion-button color="danger" @click="deleteNews">Hapus</ion-button>
                        <ion-button color="light" @click="closeDeleteModal">Batal</ion-button>
                    </div>
                </div>
            </ion-modal>
        </template>
        <template #footer>
            <div class="p-2">
                <ion-button expand="block" color="primary" mode="md" @click="router.push({ name: 'NewsInput' })">
                    <ion-icon :icon="addCircle" slot="start" color="light"></ion-icon>
                    <p class="text-white
                        normal-case">Buat Berita</p>
                </ion-button>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { fetchAllNews } from '@/data/masjid/News';
import { ref, onMounted } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonInfiniteScrollContent, IonInfiniteScroll, IonModal } from '@ionic/vue';
import { create, trashBin, addCircle } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { deleteDocument } from '@/data/Document';
import { toast } from 'frappe-ui';

const router = useRouter();
const allNews = ref([]);

onMounted(() => {
    fetchAllNews().then((data) => {
        allNews.value = data;
    });
});

const start = ref(10);
const length = ref(10);
const loadDisabled = ref(false);

const loadData = (event) => {
    fetchAllNews(start.value, length.value).then((response) => {
        start.value += length.value;
        if (response.length == 0) {
            loadDisabled.value = true;
        } else {
            allNews.value.push(...response);
        }
        event.target.complete();
    });
}

const deleteModal = ref(false);
const newsToDelete = ref(null);

const openDeleteModal = (news) => {
    deleteModal.value = true;
    newsToDelete.value = news;
}

const closeDeleteModal = () => {
    deleteModal.value = false;
    setTimeout(() => {
        newsToDelete.value = null;
    }, 300); // Tambahkan delay agar tidak merender null sebelum modal tertutup
};


const deleteNews = () => {

    deleteDocument('Mosque News', newsToDelete.value.name).then(() => {
        allNews.value = allNews.value.filter(news => news.name !== newsToDelete.value.name);
        closeDeleteModal();
        toast({
            title: "Berhasil",
            text: "Berita berhasil dihapus",
            icon: "check",
            position: "bottom-center",
            iconClasses: "text-green-500"
        })
    }).catch((response) => {
        toast({
            title: "Gagal",
            text: response.message,
            icon: "x-circle",
            position: "bottom-center",
            iconClasses: "text-red-500"
        })
    });

}
</script>