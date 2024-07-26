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
                        <div>Donatur:</div>
                        <div class="pl-10">{{ donation.fullname }}</div>
                    </div>
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
                    <div v-if="donation.status == 'Menunggu Bukti Pembayaran'" class="text-center my-4">
                        <div v-if="donation.mode_of_payment == 'QRIS'">Scan QR di bawah</div>
                        <div v-if="donation.mode_of_payment == 'Transfer Bank'">Transfer donasimu ke nomor rekening: {{donation.bank_account_no}}</div>
                        <div>Lalu kirimkan bukti tranfermu</div>
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
                <div v-if="donation.mode_of_payment == 'QRIS'" class="px-6">
                    <img :src="qrImageUrl" alt="Gambar QRIS" class="mb-6 mx-auto">
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
            <div class="flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
                <p>{{ validationSuccess }}</p>
                <component :is="validationSuccess ? SuccessIcon : FailedIcon" class="w-20 h-20 mx-auto mb-4" />
                <p v-if="validationSuccess" class="text-center text-2xl">Donasi Berhasil Divalidasi</p>
                <p v-else class="text-center text-2xl">Gagal Memvalidasi Donasi</p>
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
import SuccessIcon from '@/components/icons/SuccessIcon.vue';
import FailedIcon from '@/components/icons/FailedIcon.vue';
import { get_donation_qr } from '@/data/accounting/DonationQR';

moment.locale('id')
const router = useRouter();
const donation = ref({});
const loading = ref(true);
const user = inject('$user');
const session = inject('$session');
const isModalOpen = ref(false);
const validationSuccess = ref(false);
const qrImageUrl = ref(null);

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

const newPaymentEntry = () => {
    submitDocument("Donation", router.currentRoute.value.params.id)
        .then(data => {
            console.log("Donation Submitted: ", data);

            // Jika submitDocument berhasil, coba createPaymentEntry
            return createPaymentEntry(router.currentRoute.value.params.id);
        })
        .then(paymentData => {
            validationSuccess.value = true;
            console.log("validationSuccess: ", validationSuccess.value);
            console.log("Payment Entry Created: ", paymentData);
        })
        .catch(error => {
            console.error("Failed to submit donation or create payment entry: ", error);
            validationSuccess.value = false;
        })
        .finally(() => {
            // Tampilkan modal jika validationSuccess telah ditentukan
            if (validationSuccess) {
                console.log("validationSuccess: ", validationSuccess.value);
                isModalOpen.value = true;
            }
        });
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
    get_donation_qr()
        .then((qrImage) => {
            qrImageUrl.value = qrImage;  
        })
        .catch((error) => {
            console.error("Error fetching QR image:", error);
        });
});
</script>