<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Home from '@/components/icons/beranda.vue';
import History from '@/components/icons/riwayat.vue';
import QR from '@/components/icons/qr.vue';
import Profile from '@/components/icons/akun.vue';
import { IonTabBar } from '@ionic/vue';

const router = useRouter();

const tabs = [
    { name: 'Beranda', icon: Home, routeName: 'DonorHome' },
    { name: 'Riwayat', icon: History, routeName: 'History' },
    { name: 'Donasi', icon: QR, routeName: 'QR' },
    { name: 'Akun', icon: Profile, routeName: 'Account' }
];

const activeTab = computed(() => router.currentRoute.value.name);

const navigate = (routeName) => {
    router.push({ name: routeName });
};
</script>

<template>
    <ion-tab-bar slot="bottom" class="py-2 bg-white shadow-2xl shadow-gray-500 flex justify-around">
        <!-- <div class="fixed bottom-0 left-0 w-full bg-white border-t shadow-md p-2 flex justify-around"> -->
            <button v-for="tab in tabs" :key="tab.name" @click="navigate(tab.routeName)"
                class="flex flex-col items-center gap-2 p-2 text-gray-500 hover:text-blue-500">
                <component :is="tab.icon" class="w-6 h-6" :color="activeTab === tab.routeName ? '#223F8D' : '#6b7280'" />
    
                <span class="text-sm font-medium" :style="{ color: activeTab === tab.routeName ? '#223F8D' : '#6b7280' }">
                    {{ tab.name }}
                </span>
            </button>
        <!-- </div> -->

    </ion-tab-bar>
</template>