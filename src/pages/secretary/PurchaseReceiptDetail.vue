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
        <ion-button v-if="pr.docstatus === 0 && props.mode === 'history'" color="danger" @click="showDeleteModal = true">Hapus Pengajuan</ion-button>
        <ion-button v-if="pr.docstatus === 0 && props.mode === 'history'" @click="showSubmitModal = true">Ajukan Pembelian</ion-button>
        <ion-button v-if="pr.docstatus === 1 && pr.status == 'To Bill' && props.mode === 'history'" color="danger" @click="showCancelModal = true">Batalkan Pembelian</ion-button>
        <ion-button v-if="pr.docstatus === 1 && pr.status == 'To Bill' && props.mode === 'approve'" color="success" @click="showModeOfPaymentModal = true">Setujui</ion-button>
        <ion-button v-if="pr.docstatus === 1 && pr.status == 'To Bill' && props.mode === 'approve'" color="danger" @click="showRejectModal = true">Tolak Pengajuan</ion-button>
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
                    <ion-button @click="showCancelModal = false">Tutup</ion-button>
                </div>
            </div>
        </div>

        <!-- Mode of Payment Modal -->
        <div v-if="showModeOfPaymentModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 class="text-xl font-semibold mb-4">Metode Pembayaran</h2>
                <p class="mb-4">Dibayar menggunakan tabungan</p>
                <ion-radio-group v-model="modeOfPayment" >
                    <ion-radio value="Wire Transfer" label-placement="end">Bank</ion-radio><br/>
                    <ion-radio value="Cash" label-placement="end">Kas</ion-radio>
                </ion-radio-group>
                <div class="flex justify-end space-x-4">
                    <ion-button @click="toApproveModal">Lanjut</ion-button>
                    <ion-button @click="showModeOfPaymentModal = false">Tutup</ion-button>
                </div>
            </div>
        </div>

        <!-- Approve Modal -->
        <div v-if="showApproveModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 class="text-xl font-semibold mb-4">Konfirmasi Persetujuan</h2>
                <p class="mb-4">Apakah anda yakin untuk menyetujui pembelian ini?</p>
                <div class="flex justify-end space-x-4">
                    <ion-button color="success" @click="approvePurchaseReceipt(router.currentRoute.value.params.id)">Setujui</ion-button>
                    <ion-button @click="showApproveMOdal = false">Tutup</ion-button>
                </div>
            </div>
        </div>

        <!-- Reject Modal -->
        <div v-if="showRejectModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
                <h2 class="text-xl font-semibold mb-4">Konfirmasi Penolakan</h2>
                <p class="mb-4">Apakah anda yakin untuk menolak pembelian ini?</p>
                <div class="flex justify-end space-x-4">
                    <ion-button color="danger" @click="cancelPurchaseReceipt(router.currentRoute.value.params.id)">Tolak</ion-button>
                    <ion-button @click="showRejectModal = false">Tutup</ion-button>
                </div>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonItem, IonList, IonCardContent, IonButton, IonRadio, IonRadioGroup } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, defineProps } from 'vue'
import { getDocumentById, cancelDocument, submitDocument, deleteDocument } from '@/data/Document'
import { createInvoiceFromPurchaseReceipt } from '@/data/accounting/PurchaseInvoice'

const props = defineProps({
    mode: String
});

const router = useRouter()
const pr = ref({});
const showDeleteModal = ref(false);
const showSubmitModal = ref(false);
const showCancelModal = ref(false);
const showModeOfPaymentModal = ref(false);
const showApproveModal = ref(false);
const showRejectModal = ref(false);
const modeOfPayment = ref();

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
        if (props.mode === 'approve') {
            router.push({ name: 'PurchaseToApprove' });
        } else {
            router.push({ name: 'PurchaseHistory' });
        }
    }).catch(error => {
        console.error("Failed to cancel purchase receipt:", error);
    }).finally(() => {
        showCancelModal.value = false;
    });
}

const toApproveModal = () => {
    showModeOfPaymentModal.value = false;
    showApproveModal.value = true;
}

const approvePurchaseReceipt = (name) => {
    createInvoiceFromPurchaseReceipt(name, modeOfPayment.value).then((response) => {
        if (props.mode === 'approve') {
            router.push({ name: 'PurchaseToApprove' });
        } else {
            router.push({ name: 'PurchaseHistory' });
        }
        console.log("Purchase Invoice created:", response);
    }).catch(error => {
        console.error("Failed to approve purchase receipt:", error);
    }).finally(() => {
        showApproveModal.value = false;
    });
}
</script>
