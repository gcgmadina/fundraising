<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content>
            <div v-if="loading" class="w-full h-48 bg-gray-300 animate-pulse"></div>
            <div v-else class="w-full h-auto">
                <div class="thanks-section text-center mx-2">
                    <h1>Terimakasih</h1>
                    <p>Donasi Anda telah kami terima dan akan segera disalurkan</p>
                </div>
                <div class="border rounded-lg border-gray-900 mx-2 my-6 p-4 shadow-gray-700 shadow-lg">
                    <div class="grid grid-cols-2 mb-2">
                        <div>Tanggal:</div>
                        <div class="pl-10">{{ formatDateTime(donation.creation) }}</div>
                    </div>
                    <div class="grid grid-cols-2 mb-2">
                        <div>Metode Pembayaran:</div>
                        <div class="pl-10">{{ donation.mode_of_payment }}</div>
                    </div>
                    <div class="grid grid-cols-2 mb-2">
                        <div>Status:</div>
                        <div class="pl-10">{{ donation.docstatus == 1 ? 'Berhasil':'Menunggu Bukti Pembayaran' }}</div>
                    </div>
                </div>
                <div class="flex justify-between mx-16 my-8">
                    <div>Total Donasi</div>
                    <div class="font-bold">Rp. {{ donation.amount }}</div>
                </div>
                <div class="flex justify-between mx-16 m-8">
                    <div>Sertakan Bukti Transfer</div>
                    <div>
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
                                }" class="flex flex-row justify-between">
                                <Button @click="openFileSelector" :loading="uploading">
                                    {{ uploading ? `Uploading ${progress}%` : 'Upload Image' }}
                                </Button>
                                <div v-if="uploaded">
                                    <p>{{ image }}</p>
                                </div>
                            </template>
                        </FileUploader>
                    </div>
                </div>
            </div>
        </ion-content>
        <footer/>
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createResource, FileUploader, Button } from 'frappe-ui';
import { formatDateTime } from '@/data/DateUtils';
import moment from 'moment';

moment.locale('id')
const router = useRouter();
const donation = ref({});
const loading = ref(true);

const validateFileFunction = (fileObject) => { }
const onSuccess = (file) => {}

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