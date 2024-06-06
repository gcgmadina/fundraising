<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title class="flex justify-center">
                        Pembelian {{ pr.posting_date }}
                    </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-list>
                        <ion-item v-for="item in pr.items" :key="item.item_name">
                            <ion-label>{{ item.item_name }}</ion-label>
                            <ion-label>{{ item.qty }}</ion-label>
                            <ion-label class="flex justify-end w-full text-right">{{ item.amount }}</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>Total</ion-label>
                            <ion-label class="flex justify-end w-full text-right">{{ pr.total }}</ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
        <ion-button v-if="pr.docstatus === 0" color="danger" @click="showDeleteModal = true">Delete Purchase Receipt</ion-button>
        <ion-button v-if="pr.docstatus === 0" @click="showSubmitModal = true">Ajukan Pembelian</ion-button>
        <ion-button v-if="pr.docstatus === 1" color="danger" @click="showCancelModal = true">Batalkan Pembelian</ion-button>
        <Footer/>

        <!-- Delete Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 class="text-xl font-semibold mb-4">Konfirmasi Penghapusan</h2>
                <p class="mb-4">Apakah Anda yakin ingin menghapus bukti pembelian ini?</p>
                <div class="flex justify-end space-x-4">
                    <ion-button color="danger" @click="deletePurchaseReceipt(router.currentRoute.value.params.id)">Hapus</ion-button>
                    <ion-button @click="showDeleteModal = false">Batal</ion-button>
                </div>
            </div>
        </div>

        <!-- Submit Modal -->
        <div v-if="showSubmitModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 class="text-xl font-semibold mb-4">Konfirmasi Pengajuan</h2>
                <p class="mb-4">Apakah Anda yakin ingin mengajukan bukti pembelian ini?</p>
                <div class="flex justify-end space-x-4">
                    <ion-button @click="submitPurchaseReceipt(router.currentRoute.value.params.id)">Ajukan</ion-button>
                    <ion-button @click="showSubmitModal = false">Batal</ion-button>
                </div>
            </div>
        </div>

        <!-- Cancel Modal -->
        <div v-if="showCancelModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 class="text-xl font-semibold mb-4">Konfirmasi Pembatalan</h2>
                <p class="mb-4">Apakah Anda yakin ingin membatalkan bukti pembelian ini?</p>
                <div class="flex justify-end space-x-4">
                    <ion-button color="danger" @click="cancelPurchaseReceipt(router.currentRoute.value.params.id)">Batalkan</ion-button>
                    <ion-button @click="showCancelModal = false">Batal</ion-button>
                </div>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonItem, IonList, IonCardContent, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getDocumentById, cancelDocument, submitDocument, deleteDocument } from '@/data/Document'

const router = useRouter()
const pr = ref({});
const showDeleteModal = ref(false);
const showSubmitModal = ref(false);
const showCancelModal = ref(false);

onMounted(() => {
    getDocumentById("Purchase Receipt", router.currentRoute.value.params.id).then(response => {
        pr.value = response;
    }).catch(error => {
        console.error("Failed to get purchase receipt:", error);
    });
});

const deletePurchaseReceipt = (name) => {
    deleteDocument("Purchase Receipt", name).then(() => {
        router.push({ name: 'PurchaseHistory' });
    }).catch(error => {
        console.error("Failed to delete purchase receipt:", error);
    }).finally(() => {
        showDeleteModal.value = false;
    });
}

const submitPurchaseReceipt = (name) => {
    submitDocument("Purchase Receipt", name).then(() => {
        router.go();
    }).catch(error => {
        console.error("Failed to submit purchase receipt:", error);
    }).finally(() => {
        showSubmitModal.value = false;
    });
}

const cancelPurchaseReceipt = (name) => {
    cancelDocument("Purchase Receipt", name).then(() => {
        router.push({ name: 'PurchaseHistory' });
    }).catch(error => {
        console.error("Failed to cancel purchase receipt:", error);
    }).finally(() => {
        showCancelModal.value = false;
    });
}
</script>
