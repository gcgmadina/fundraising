<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <!-- Mencegah Scroll -->
            <div class="fixed inset-0 overflow-hidden">
                <!-- Background Fullscreen -->
                <div 
                    class="absolute inset-0 bg-cover bg-center"
                    :style="`background-image: url('${masjid}')`">
                </div>

                <!-- Overlay Gelap -->
                <div class="absolute inset-0 bg-black/50"></div>

                <!-- Kontainer Konten di Tengah -->
                <div class="relative flex justify-center items-center h-screen w-full px-4">
                    <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                        <img src="@/components/icons/WhatsApp_Image_2023-12-18_at_10.48.59_9397a2c2-removebg-preview (1).jpg" 
                            alt="GCG Madina Logo" 
                            class="w-40 mx-auto mb-4" />
                        <h3 class="text-xl font-semibold text-violet-800">Donasi</h3>
                        <p class="text-gray-600 mt-2">Scan QR di Bawah untuk</p>
                        <img :src="qrImageUrl" alt="QR Code" class="w-40 mx-auto my-4" />
                        <p class="text-gray-600">Donasi hanya akan tercatat</p>
                        <p class="text-violet-800 font-semibold">Terimakasih Telah Berdonasi !</p>
                    </div>
                </div>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonContent } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { get_donation_qr } from '@/data/accounting/DonationQR';
import BaseLayout from '@/components/BaseLayout.vue';
import masjid from "@/components/icons/mosque_image.jpg";

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
