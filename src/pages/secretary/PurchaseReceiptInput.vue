<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content class="p-4 relative">
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <div v-for="(item, index) in items" :key="index" class="item-form space-y-2 mb-4">
                    <ion-item>
                        <ion-select v-model="item.item_code" label="Nama Barang" labelPlacement="floating">
                            <ion-select-option v-for="item in itemList" :value="item.name">{{ item.name
                                }}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-input type="number" v-model="item.qty" label="Kuantitas"
                            labelPlacement="floating"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-input type="number" v-model="item.rate" label="harga satuan"
                            labelPlacement="floating"></ion-input>
                    </ion-item>
                    <ion-button v-if="items.length > 1" @click="removeItem(index)" expand="block" color="danger">Hapus
                        Barang</ion-button>
                </div>
                <ion-button @click="addItem" expand="block">Tambah Barang</ion-button>
                <ion-button type="submit" expand="block" :disabled="isSubmitDisabled">Simpan &#38; Ajukan</ion-button>
            </form>
            <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div class="bg-white p-6 rounded shadow-lg text-center">
                    <h2 class="text-2xl mb-4">Sukses!</h2>
                    <p class="mb-4">Berhasil menambah riwayat pembelian</p>
                    <ion-button @click="goToPurchaseHistory" expand="block">kembali</ion-button>
                </div>
            </div>
        </ion-content>
        <div>
            <ion-button @click="router.push({name: 'PurchaseHistory'})" expand="block">Riwayat Pembelian</ion-button>
        </div>
        <Footer />
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonItem, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
import { addPurchaseReceipt } from '@/data/secretary/PurchaseReceipt';
import { itemResource, itemList } from '@/data/secretary/Item';

const router = useRouter();
const items = ref([{ item_code: '', qty: null, rate: null }]);
const isModalOpen = ref(false);

onMounted(() => {
    itemResource();
});

onUnmounted(() => {
    router.go();
});

const addItem = () => {
    items.value.push({ item_code: '', qty: null, rate: null });
};

const removeItem = (index) => {
    if (items.value.length > 1) {
        items.value.splice(index, 1);
    }
};

const handleSubmit = () => {
    addPurchaseReceipt(items.value)
        .then(() => {
            isModalOpen.value = true;
        })
        .catch((error) => {
            console.error('Failed to add purchase receipt:', error);
        });
};

const closeModal = () => {
    isModalOpen.value = false;
};

const goToPurchaseHistory = () => {
    closeModal();
    router.push({ name: 'PurchaseHistory' });
};

const isSubmitDisabled = computed(() => {
    return items.value.some((item) => !item.item_code || item.qty === null || item.rate === null);
});
</script>