<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <h6 class="mx-6 mb-0">Donasi</h6>
            <ion-card @click="openQRModal">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>QR Donasi</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <h6 class="mx-6 mb-0">Laporan</h6>
            <ion-card @click="reportFilterModal = true">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Laporan Keuangan</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <h6 class="mx-6 mb-0">Rekening</h6>
            <router-link :to="{ name: 'BankAccount' }">
                <ion-card>
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>Rekening Bank</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan" />
                        </div>
                    </ion-card-header>
                </ion-card>
            </router-link>
            <h6 class="mx-6 mb-0">Pembelian</h6>
            <router-link :to="{ name: 'PurchaseToApprove' }">
                <ion-card>
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>Daftar Pembelian</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan" />
                        </div>
                    </ion-card-header>
                </ion-card>
            </router-link>
            <h6 class="mx-6 mb-0">Pengeluaran</h6>
            <ion-card @click="toExpenseList('Pembayaran Listrik')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Listrik</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <ion-card @click="toExpenseList('Pembayaran Air')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Air</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <ion-card @click="toExpenseList('Honor Penceramah')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Honorarium Penceramah</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <ion-card @click="toExpenseList('Biaya Kebersihan')">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Biaya Kebersihan</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
            <h6 class="mx-6 mb-0">Lainnya</h6>
            <ion-card @click="toAccounting">
                <ion-card-header>
                    <div class="flex flex-auto justify-between items-center">
                        <ion-card-subtitle>Lainnya</ion-card-subtitle>
                        <ion-icon :icon="GreaterThan" />
                    </div>
                </ion-card-header>
            </ion-card>
        </ion-content>

        <div v-if="reportFilterModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
                <h6 class="text-center">Pilih Rentang Laporan Keuangan</h6>
                <ion-item>
                    <ion-label>Dari</ion-label>
                    <ion-datetime-button datetime="startsOn"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime v-model="startsOn" id="startsOn" presentation="date"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <ion-item>
                    <ion-label>Sampai</ion-label>
                    <ion-datetime-button datetime="endsOn"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime v-model="endsOn" id="endsOn" presentation="date"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <div class="flex flex-col items-center">
                    <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
                    <div class="flex flex-row justify-end w-full">
                        <ion-button class="mt-4" color="success"
                            @click="setFilter(startsOn, endsOn)">Lanjut</ion-button>
                        <ion-button class="mt-4" @click="reportFilterModal = false">Tutup</ion-button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="QRModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
              <div class="flex flex-col items-center">
                <h6 v-if="qrImageUrl" class="text-xl font-semibold mb-4">Ganti QR Donasi</h6>
                <h6 v-else class="text-xl font-semibold mb-4">Upload QR Donasi</h6>
                <FileUploader :fileTypes="['image/*']" :validateFile="validateFileFunction" @success="onSuccess">
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
                  }">
                    <div class="flex flex-col items-center">
                      <Button @click="openFileSelector" :loading="uploading">
                        {{ uploading ? `Uploading ${progress}%` : 'Upload Image' }}
                      </Button>
                    </div>
                  </template>
                </FileUploader>
              </div>
              <div v-if="qrImageUrl" class="mt-4">
                <img :src="qrImageUrl" alt="">
              </div>
              <div class="flex justify-end mt-4">
                <ion-button @click="QRModal = false">Tutup</ion-button>
              </div>
            </div>
          </div>          
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonIcon, IonLabel, IonDatetimeButton, IonDatetime, IonModal, IonButton, IonItem } from '@ionic/vue';
import Header from '@/components/Header.vue';
import GreaterThan from '@/components/icons/greater-than.svg';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getReportData } from '@/data/accounting/Report';
import { generatePDFReport } from '@/data/generatePDFReport';
import { createResource, FileUploader, Button } from 'frappe-ui';
import { get_donation_qr } from '@/data/accounting/DonationQR';

const router = useRouter();
const reportFilterModal = ref(false);
const today = new Date();
const lastMonth = new Date();
lastMonth.setMonth(today.getMonth() - 1);
const startsOn = ref(lastMonth.toISOString().substring(0, 10));
const endsOn = ref(today.toISOString().substring(0, 10));
const errorMessage = ref('');
const QRModal = ref(false);
const qrImageUrl = ref('');

const toAccounting = () => {
    window.location.pathname = 'app/accounting';
};

const toExpenseList = (expense) => {
    router.push({ name: 'Expenses', params: { name: expense } });
};

const setFilter = (start, end) => {
    if (start > end) {
        errorMessage.value = 'Tanggal mulai tidak boleh lebih dari tanggal selesai.';
        return;
    }

    const filters = {
        from_date: start,
        to_date: end,
    };
    console.log("Filters:", filters);

    getReportData(filters)
        .then((response) => {
            console.log("Report data:", response);
            generatePDFReport(response, startsOn.value, endsOn.value);
            reportFilterModal.value = false;
        })
        .catch((error) => {
            console.error("Error setting filter or fetching report data:", error);
        });
};

const openQRModal = () => {
    QRModal.value = true;
    // Fetch QR code image
    get_donation_qr()
        .then((qrImage) => {
            qrImageUrl.value = qrImage;  // Set the URL or base64 image data
        })
        .catch((error) => {
            console.error("Error fetching QR image:", error);
        });
};

const validateFileFunction = (fileObject) => { }
const onSuccess = async (file) => {
    let postFile = createResource({
        method: "POST",
        url: "non_profit.api.donationqr.update_qr_image",
        params: {
            qr_image: file.file_url
        },
        transform(data) {
            console.log(data);
        }
    });
    postFile.reload();
    window.location.reload();
}
</script>