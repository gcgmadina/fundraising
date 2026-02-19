<template>
    <BaseLayout>
        <template #content>
            <h1 class="font-semibold text-violet-900">Penggalangan Dana</h1>
            <ion-searchbar v-model="searchQuery" mode="md" debounce="300" placeholder="Cari kajian..."
                @ionInput="searchFundraising">
            </ion-searchbar>
            <div class="border-2 my-4"></div>


            <ion-card v-for="fundraising in filteredFundraising" class="flex justify-between items-center p-4"
                mode="md">
                <ion-card-header class="w-[40%]">
                    <!-- <ion-card-title class="text-violet-800 font-semibold overflow-hidden  text-ellipsis line-clamp-2"> -->
                    <ion-card-title
                        :class="{ 'text-gray-400': isPastDate(fundraising.ends_on), 'text-violet-800': !isPastDate(fundraising.ends_on) }"
                        class="font-semibold overflow-hidden text-ellipsis line-clamp-2">

                        {{ fundraising.title }}
                    </ion-card-title>
                </ion-card-header>
                <div>
                    <p class="font-sm">{{ fundraising.starts_on }}-{{ fundraising.ends_on }}</p>
                    <p class="font-sm">Rp. {{ formatCurrency(fundraising.goal) }}</p>
                </div>
                <div class="flex flex-col">
                    <!-- <ion-button color="warning" mode="md" size="small">
                        <ion-icon :icon="create" slot="start" color="light"></ion-icon>
                        <p class="text-white normal-case">
                            Edit
                        </p>
                    </ion-button> -->
                    <ion-button color="danger" mode="md" size="small" @click="openDeleteModal(fundraising)">
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
                    <h2>Apakah Anda yakin ingin menghapus Penggalangan dana dengan judul:
                        <p class="text-basic text-gray-700">{{ fundraisingToDelete?.title }}</p> ?
                    </h2>
                    <div class="flex justify-end gap-2 my-4">
                        <ion-button color="danger" @click="deleteFundraising">Hapus</ion-button>
                        <ion-button color="light" @click="closeDeleteModal">Batal</ion-button>
                    </div>
                </div>
            </ion-modal>
        </template>
        <template #footer>
            <div class="p-2">
                <ion-button expand="block" color="primary" mode="md" @click="router.push({ name: 'FundraisingInput' })">
                    <ion-icon :icon="addCircle" slot="start" color="light"></ion-icon>
                    <p class="text-white
                        normal-case">Tambah Penggalangan Dana</p>
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
import { deleteDocument } from '@/data/Document';
import { fundraising } from '@/data/donation/Fundraising';
import { formatCurrency } from "@/data/utils"

const router = useRouter();
const allFundraising = ref([]);
const searchQuery = ref('');
const filteredFundraising = ref([]);
const fuse = ref(null);

onMounted(() => {

    fundraising.getList.fetch(
        {
            start: 0,
            length: 10,
            show_all: true
        }
    ).then((data) => {
        allFundraising.value = data.data;
        filteredFundraising.value = data.data;

        // Inisialisasi Fuse.js
        fuse.value = new Fuse(allFundraising.value, {
            keys: ['title'],
            threshold: 0.5,
        });
    });
});

const searchFundraising = () => {
    if (!searchQuery.value) {
        filteredFundraising.value = allFundraising.value;
    } else if (fuse.value) {
        const result = fuse.value.search(searchQuery.value);
        filteredFundraising.value = result.map(item => item.item);
    }
};

const start = ref(10);
const length = ref(10);
const loadDisabled = ref(false);

const loadData = (event) => {
    fundraising.getList.fetch(
        {
            start: start.value,
            length: length.value,
            show_all: true
        }
    ).then((response) => {
        start.value += length.value;
        if (response.data.length == 0) {
            loadDisabled.value = true;
        } else {
            allFundraising.value.push(...response.data);
            fuse.value.setCollection(allFundraising.value);

            if (searchQuery.value) {
                const result = fuse.value.search(searchQuery.value);
                filteredFundraising.value = result.map(item => item.item);
            } else {
                filteredFundraising.value = [...allFundraising.value];
            }
        }
        event.target.complete();
    });
}

watch(allFundraising, (newVal) => {
    fuse.value = new Fuse(newVal, {
        keys: ['title'],
        threshold: 0.5,
    });
});

const deleteModal = ref(false);
const fundraisingToDelete = ref(null);

const openDeleteModal = (fundraising) => {
    deleteModal.value = true;
    fundraisingToDelete.value = fundraising;
}

const closeDeleteModal = () => {
    deleteModal.value = false;
    setTimeout(() => {
        fundraisingToDelete.value = null;
    }, 300); // Tambahkan delay agar tidak merender null sebelum modal tertutup
};


const deleteFundraising = () => {

    deleteDocument('Fundraising', fundraisingToDelete.value.name).then(() => {
        allFundraising.value = allFundraising.value.filter(fundraising => fundraising.name !== fundraisingToDelete.value.name);
        if (searchQuery.value) {
            const result = fuse.value.search(searchQuery.value);
            filteredFundraising.value = result.map(item => item.item);
        } else {
            filteredFundraising.value = [...allFundraising.value];
        }

        closeDeleteModal();

        toast({
            title: "Berhasil",
            text: "Penggalangan dana berhasil dihapus",
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

const isPastDate = (dateString) => {
    const today = new Date();
    const endDate = new Date(dateString);
    return endDate < today;
};

</script>