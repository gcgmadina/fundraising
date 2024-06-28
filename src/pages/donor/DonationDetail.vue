<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <div v-if="loading" class="w-full h-48 bg-gray-300 animate-pulse"></div>
            <div v-else class="w-full h-auto">
                <div class="thanks-section text-center mx-2">
                    <template v-if="!donation.evidance_of_transfer">
                        <h1>Kirim Bukti Transfermu</h1>
                        <p>Kirim bukti transfer untuk memverifikasi donasimu</p>
                    </template>
                    <template v-else-if="donation.docstatus === 0 && donation.evidance_of_transfer">
                        <h1>Menunggu Verifikasi</h1>
                        <p>Donasi Anda sedang diverifikasi oleh admin kami</p>
                    </template>
                    <template v-else-if="donation.docstatus === 1 && donation.evidance_of_transfer">
                        <h1>Terimakasih</h1>
                        <p>Donasi Anda telah kami terima dan akan segera disalurkan</p>
                    </template>
                </div>
                <div class="border rounded-lg border-gray-900 mx-2 my-6 p-4 shadow-gray-700 shadow-lg">
                    <div class="grid grid-cols-2 mb-2">
                        <div>Tanggal:</div>
                        <div class="pl-10">{{ formatDateTime(donation.creation) }}</div>
                    </div>
                    <div v-if="donation.item_type === 'Uang'" class="grid grid-cols-2 mb-2">
                        <div>Metode Pembayaran:</div>
                        <div class="pl-10">{{ donation.mode_of_payment }}</div>
                    </div>
                    <div class="grid grid-cols-2 mb-2">
                        <div>Status:</div>
                        <div class="pl-10"> {{ donation.status }} </div>
                    </div>
                </div>
                <div v-if="donation.item_type === 'Uang'" class="flex justify-between mx-16 my-8">
                    <div>Total Donasi</div>
                    <div class="font-bold">Rp. {{ donation.amount }}</div>
                </div>
                <div v-else class="flex justify-between mx-16 my-8">
                    <div>{{ donation.item_name }}:</div>
                    <div class="font-bold">{{ donation.item_amount }}</div>
                </div>
                <div v-if="donation.evidance_of_transfer" class="flex justify-between mx-16 m-8">
                    <img :src="donation.evidance_of_transfer" alt="Preview Image"
                        style="max-width: 200px; max-height: 200px;">
                </div>
                <div v-else class="flex justify-between mx-16 m-8">
                    <div>Sertakan Bukti Transfer</div>
                    <div>
                        <FileUploader :fileTypes="['image/*']" :validateFile="validateFileFunction"
                            @success="onSuccess">
                            <template v-slot="{
            file,
            uploading,
            progress,
            uploaded,
            message,
            error,
            total,
            success,
            openFileSelector,
        }" class="flex flex-row justify-between">
                                <Button @click="openFileSelector" :loading="uploading">
                                    {{ uploading ? `Uploading ${progress}%` : 'Upload Image' }}
                                </Button>
                            </template>
                        </FileUploader>
                    </div>
                </div>
                <div v-if="session.isLoggedIn && user.data && user.data.roles && user.data.user_type === 'System User'">
                    <div v-if="donation.evidance_of_transfer && donation.docstatus === 0">
                        <ion-button expand="block" @click="newPaymentEntry">Validasi Donasi</ion-button>
                    </div>
                </div>
            </div>
        </ion-content>
        <Footer />

        <!-- Modal for success message -->
        <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
                <h2 class="text-xl font-bold mb-4">Donasi Berhasil Divalidasi</h2>
                <p>Donasi Anda telah berhasil diterima dan divalidasi.</p>
                <ion-button class="mt-4" @click="closeModal">Tutup</ion-button>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted, inject } from 'vue';
import { useRouter } from 'vue-router';
import { createResource, FileUploader, Button } from 'frappe-ui';
import { formatDateTime } from '@/data/DateUtils';
import moment from 'moment';
import { createPaymentEntry } from '@/data/accounting/PaymentEntry';
import { submitDocument } from '@/data/Document';

moment.locale('id')
const router = useRouter();
const donation = ref({});
const loading = ref(true);
const user = inject('$user');
const session = inject('$session');
const isModalOpen = ref(false);

const validateFileFunction = (fileObject) => { }
const onSuccess = async (file) => {
    let postFile = createResource({
        method: "POST",
        url: "non_profit.api.fundraising.upload_evidence",
        params: {
            donation_id: router.currentRoute.value.params.id,
            evidence: file.file_url
        },
        transform(data) {
            console.log(data);
        }
    });
    postFile.reload();
    window.location.reload();
}

const newPaymentEntry = async () => {
    submitDocument("Donation", router.currentRoute.value.params.id)
        .then(data => {
            console.log("Donation Submitted: ", data);
            // Anda dapat melakukan navigasi atau tindakan lain di sini
        })
        .catch(error => {
            console.error("Failed to submit donation: ", error);
        });

    createPaymentEntry(router.currentRoute.value.params.id)
        .then(paymentData => {
            console.log("Payment Entry Created: ", paymentData);
            // Anda dapat melakukan navigasi atau tindakan lain di sini
        })
        .catch(error => {
            console.error("Failed to create payment entry: ", error);
        });

    isModalOpen.value = true;
}

const closeModal = () => {
    isModalOpen.value = false;
    router.push({ name: 'History' });
}

const donationDetail = createResource({
    method: "GET",
    url: "non_profit.api.fundraising.get_donation_by_id",
    auto: true,
    realtime: true,
    params: {
        donation_id: router.currentRoute.value.params.id
    },
    transform(data) {
        donation.value = data;
        loading.value = false;
    }
});
// console.log(moment.locale('id'))
onMounted(() => {
    // moment.locale('id-ID');
    donationDetail.reload();
    donation.creation = moment(donation.creation).format('D MMMM YYYY HH:mm');
});
</script>