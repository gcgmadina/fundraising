<template>
    <ion-tab-bar slot="bottom" class="py-1 bg-white shadow-2xl shadow-gray-500">
        <ion-tab-button @click="router.push({ name: 'DonorHome' })" :class="[
            'text-xs bg-white space-y-1.5 transition active:scale-95',
            currentRoute.name === 'DonorHome'
                ? 'border-green-600 text-green-600 font-bold'
                : 'font-medium text-gray-700',
        ]">
            <component :is="HomeIcon" :class="currentRoute.name === 'DonorHome' ? 'text-green-600' : 'text-gray-700'"
                class="h-5 w-5" />
            <div>Beranda</div>
        </ion-tab-button>
        <ion-tab-button @click="router.push({ name: 'History' })" :class="[
            'text-xs bg-white space-y-1.5 transition active:scale-95',
            currentRoute.name === 'History'
                ? 'border-green-600 text-green-600 font-bold'
                : 'font-medium text-gray-700',
        ]">
            <component :is="HistoryIcon" :class="currentRoute.name === 'History' ? 'text-green-600' : 'text-gray-700'"
                class="h-5 w-5" />
            <div>Riwayat</div>
        </ion-tab-button>
        <ion-tab-button v-if="qrImageUrl && (!session.isLoggedIn || user.data.user_type === 'Website User')"
            @click="router.push({ name: 'QR' })" :class="[
            'text-xs bg-white space-y-1.5 transition active:scale-95',
            currentRoute.name === 'QR'
                ? 'border-green-600 text-green-600 font-bold'
                : 'font-medium text-gray-700',
        ]">
            <component :is="QRIcon" :class="currentRoute.name === 'QR' ? 'text-green-600' : 'text-gray-700'"
                class="h-5 w-5" />
            <div>Donasi</div>
        </ion-tab-button>
        <ion-tab-button @click="openQuranPopover" id="quran" :class="[
            'text-xs bg-white space-y-1.5 transition active:scale-95',
            'font-medium text-gray-700'
        ]">
            <component :is="Quran" class="h-5 w-5" />
            <div>Ibadah</div>
        </ion-tab-button>
        <ion-popover trigger="quran" side="top" alignment="center"
            animated="false" :is-open="quranPopoverOpen" @didDismiss="quranPopoverOpen = false">
            <ion-content class="ion-padding">
                <h4 class="my-4 cursor-pointer" @click="toSurahList">Qur'an</h4>
                <h4 class="my-4 cursor-pointer" @click="toDzikirPagi">Dzikir Pagi</h4>
                <h4 class="my-4 cursor-pointer" @click="toDzikirPetang">Dzikir Petang</h4>
            </ion-content>
        </ion-popover>
        <ion-tab-button v-if="isAdmin" @click="openPopover" id="administrasi" :class="[
            'text-xs bg-white space-y-1.5 transition active:scale-95',
            'font-medium text-gray-700'
        ]">
            <component :is="EventIcon" class="h-5 w-5" />
            <div>Administrasi</div>
        </ion-tab-button>
        <ion-popover v-if="isAdmin && popoverTriggerRendered" trigger="administrasi" side="top" alignment="center"
            animated="false" :is-open="popoverOpen" @didDismiss="popoverOpen = false">
            <ion-content class="ion-padding">
                <h4 class="my-4 cursor-pointer" @click="toAccounting"
                    v-if="user.data.roles.includes('Non Profit Accounting')">Keuangan</h4>
                <h4 class="my-4 cursor-pointer" @click="toInventaris">Administrasi</h4>
                <h4 class="my-4 cursor-pointer" @click="toEventInput"
                    v-if="user.data.roles.includes('Non Profit Secretary')">Kegiatan</h4>
                <h4 class="my-4 cursor-pointer" @click="toNewsInput"
                    v-if="user.data.roles.includes('Non Profit Secretary')">Berita</h4>
            </ion-content>
        </ion-popover>
        <ion-tab-button @click="router.push({ name: 'Account' })" :class="[
            'text-xs bg-white space-y-1.5 transition active:scale-95',
            currentRoute.name === 'Account'
                ? 'border-green-600 text-green-600 font-bold'
                : 'font-medium text-gray-700',
        ]">
            <component :is="AccountIcon" :class="currentRoute.name === 'Account' ? 'text-green-600' : 'text-gray-700'"
                class="h-5 w-5" />
            <div>Akun</div>
        </ion-tab-button>
    </ion-tab-bar>
</template>

<script setup>
import { ref, inject, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IonTabBar, IonTabButton, IonContent, IonPopover } from '@ionic/vue';
import HomeIcon from '@/components/icons/HomeIcon.vue';
import HistoryIcon from '@/components/icons/HistoryIcon.vue';
import AccountIcon from '@/components/icons/AccountIcon.vue';
import EventIcon from '@/components/icons/EventIcon.vue';
import QRIcon from '@/components/icons/QRIcon.vue';
import BookIcon from '@/components/icons/BookIcon.vue';
import Quran from '@/components/icons/Quran.vue';
import { get_donation_qr } from '@/data/accounting/DonationQR';

const user = inject('$user');
const session = inject('$session');
const router = useRouter();
const currentRoute = useRoute();

const isAdmin = ref(false);
const popoverOpen = ref(false);
const popoverTriggerRendered = ref(false); // New ref to track rendering
const qrImageUrl = ref();
const quranPopoverOpen = ref(false);

const openPopover = () => {
    popoverOpen.value = !popoverOpen.value;
};

const toEventInput = () => {
    popoverOpen.value = false;
    router.push({ name: 'EventInput' });
};

const toInventaris = () => {
    popoverOpen.value = false;
    router.push({ name: 'secretary' });
};

const toAccounting = () => {
    popoverOpen.value = false;
    router.push({ name: 'accountant' });
};

const openQuranPopover = () => {
    quranPopoverOpen.value = !quranPopoverOpen.value;
};

const toSurahList = () => {
    quranPopoverOpen.value = false;
    router.push({ name: 'SurahList' });
};

const toDzikirPagi = () => {
    quranPopoverOpen.value = false;
    router.push({ name: 'DzikirPagi' });
};

const toDzikirPetang = () => {
    quranPopoverOpen.value = false;
    router.push({ name: 'DzikirPetang' });
};

const toNewsInput = () => {
    popoverOpen.value = false;
    router.push({ name: 'NewsInput' });
};

onMounted(async () => {
    get_donation_qr()
        .then((qrImage) => {
            qrImageUrl.value = qrImage;  // Set the URL or base64 image data
        })
        .catch((error) => {
            console.error("Error fetching QR image:", error);
        });

    if (session.isLoggedIn && user.data && user.data.roles && user.data.user_type === 'System User') {
        isAdmin.value = true;
        // Ensure popoverTriggerRendered is set to true after next render
        nextTick(() => {
            popoverTriggerRendered.value = true;
        });
    }
});
</script>