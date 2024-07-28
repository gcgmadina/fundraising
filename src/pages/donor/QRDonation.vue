<template>
    <ion-page>
        <Header/>
        <ion-content>
            <h1 class="text-center">Scan QR di bawah untuk berdonasi</h1>
            <div class="flex justify-center px-4 my-2">
                <img :src="qrImageUrl" />

            </div>
            <p class="text-xs text-center"><span class="text-red-700">*</span>Donasi tidak akan tercatat dalam riwayat, namun tercatat dalam keuangan masjid</p>
            <h3 class="text-center">Terimakasih sudah berdonasi</h3>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { get_donation_qr } from '@/data/accounting/DonationQR';

const qrImageUrl = ref();

onMounted(async () => {
    get_donation_qr()
    .then((qrImage) => {
      qrImageUrl.value = qrImage;  // Set the URL or base64 image data
    })
    .catch((error) => {
      console.error("Error fetching QR image:", error);
    });
});
</script>
