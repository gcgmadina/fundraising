<template>
    <BaseLayout>
        <template #content>
            <h1 class="font-semibold text-violet-900">Kajian</h1>
            <ion-searchbar v-model="searchQuery" mode="md" debounce="300" placeholder="Cari kajian..." @ionInput="searchDiscourses">
            </ion-searchbar>
            <div class="border-2 my-4"></div>


            <ion-card v-for="discourse in filteredDiscourses" class="flex justify-between items-center p-4" mode="md">
                <ion-card-header class="w-[40%]">
                    <ion-card-title class="text-violet-800 font-medium overflow-hidden  text-ellipsis line-clamp-2">
                        {{ discourse.subject }}
                    </ion-card-title>
                </ion-card-header>
                <p>{{ discourse.time }}</p>
                <div class="flex flex-col">
                    <!-- <ion-button color="warning" mode="md" size="small">
                        <ion-icon :icon="create" slot="start" color="light"></ion-icon>
                        <p class="text-white normal-case">
                            Edit
                        </p>
                    </ion-button> -->
                    <ion-button color="danger" mode="md" size="small" @click="openDeleteModal(discourse)">
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
                    <h2>Apakah Anda yakin ingin menghapus kajian dengan judul:
                        <p class="text-basic text-gray-700">{{ discourseToDelete?.subject }}</p> ?
                    </h2>
                    <div class="flex justify-end gap-2 my-4">
                        <ion-button color="danger" @click="deleteDiscourses">Hapus</ion-button>
                        <ion-button color="light" @click="closeDeleteModal">Batal</ion-button>
                    </div>
                </div>
            </ion-modal>
        </template>
        <template #footer>
            <div class="p-2">
                <ion-button expand="block" color="primary" mode="md" @click="router.push({ name: 'DiscourseInput' })">
                    <ion-icon :icon="addCircle" slot="start" color="light"></ion-icon>
                    <p class="text-white
                        normal-case">Tambah Kajian</p>
                </ion-button>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { ref, onMounted, watch } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonInfiniteScrollContent, IonInfiniteScroll, IonModal, IonSearchbar } from '@ionic/vue';
import { create, trashBin, addCircle } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { toast } from 'frappe-ui';
import Fuse from 'fuse.js';
import { discourse } from '@/data/masjid/Discourse';
import { deleteDocument } from '@/data/Document';

const router = useRouter();
const allDiscourses = ref([]);
const searchQuery = ref('');
const filteredDiscourses = ref([]);
const fuse = ref(null);

onMounted(() => {

    discourse.getList.fetch(
        {
            start: 0,
            length: 10
        }
    ).then((data) => {
        allDiscourses.value = data.data;
        filteredDiscourses.value = data.data; // Awalnya tampilkan semua berita

        // Inisialisasi Fuse.js
        fuse.value = new Fuse(allDiscourses.value, {
            keys: ['subject'], 
            threshold: 0.5,  
        });
    });
});

const searchDiscourses = () => {
    if (!searchQuery.value) {
        filteredDiscourses.value = allDiscourses.value;
    } else if (fuse.value) {
        const result = fuse.value.search(searchQuery.value);
        filteredDiscourses.value = result.map(item => item.item);
    }
};

const start = ref(10);
const length = ref(10);
const loadDisabled = ref(false);

const loadData = (event) => {
    discourse.getList.fetch(
        {
            start: start.value,
            length: length.value
        }
    ).then((response) => {
        start.value += length.value;
        if (response.data.length == 0) {
            loadDisabled.value = true;
        } else {
            allDiscourses.value.push(...response.data);
            fuse.value.setCollection(allDiscourses.value);

            if (searchQuery.value) {
                const result = fuse.value.search(searchQuery.value);
                filteredDiscourses.value = result.map(item => item.item);
            } else {
                filteredDiscourses.value = [...allDiscourses.value];
            }
        }
        event.target.complete();
    });
}

watch(allDiscourses, (newVal) => {
    fuse.value = new Fuse(newVal, {
        keys: ['subject'],
        threshold: 0.5,
    });
});

const deleteModal = ref(false);
const discourseToDelete = ref(null);

const openDeleteModal = (discourse) => {
    deleteModal.value = true;
    discourseToDelete.value = discourse;
}

const closeDeleteModal = () => {
    deleteModal.value = false;
    setTimeout(() => {
        discourseToDelete.value = null;
    }, 300); // Tambahkan delay agar tidak merender null sebelum modal tertutup
};


const deleteDiscourses = () => {

    deleteDocument('Islamic Discourse', discourseToDelete.value.name).then(() => {
        allDiscourses.value = allDiscourses.value.filter(discourse => discourse.name !== discourseToDelete.value.name);
        if (searchQuery.value) {
            const result = fuse.value.search(searchQuery.value);
            filteredDiscourses.value = result.map(item => item.item);
        } else {
            filteredDiscourses.value = [...allDiscourses.value];
        }

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