<template>
    <BaseLayout>
        <template #content>
            <h1 class="font-semibold text-violet-900">QR Donasi</h1>
            <ion-item>
                <ion-label>Qr Donasi</ion-label>
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
                        <ion-button v-if="qrCode" @click="openFileSelector" :loading="uploading" class="normal-case">
                            {{ uploading ? `Uploading ${progress}%` : 'Ganti' }}
                        </ion-button>
                        <ion-button v-else @click="openFileSelector" :loading="uploading" class="normal-case">
                            {{ uploading ? `Uploading ${progress}%` : 'Upload QR' }}
                        </ion-button>
                    </template>
                </FileUploader>
            </ion-item>
            <img v-if="qrCode" :src="qrCode" alt="Gambar QR" class="mx-auto my-8">
            <!-- <ion-button @click="saveQR">Simpan</ion-button> -->
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { ref, onMounted, reactive } from 'vue';
import { get_donation_qr } from '@/data/accounting/DonationQR.js'
import { FileUploader, toast, createResource } from 'frappe-ui';
import { IonItem, IonLabel, IonButton } from '@ionic/vue';

const qrCode = ref(null);

onMounted(async () => {
    qrCode.value = await get_donation_qr();
});

const validateFileFunction = (fileObject) => {
}
const onSuccess = (file) => {
    qrCode.value = file.file_url;
    saveQR.submit(qrCode.value);
}

const saveQR = createResource({
    method: "POST",
    url: "non_profit.api.donationqr.update_qr_image",
    makeParams(QRCode) {
        return {
            qr_image: QRCode
        }
    },
    transform(data) {
        console.log(data);
    }
})
</script>