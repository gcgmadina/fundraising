<template>
    <ion-footer>
        <ion-toolbar>
            <div class="menu-button-list flex justify-between items-center w-full">
                <div >
                    <MenuButton :icon="HomeIcon" :label="'Beranda'" :route="'DonorHome'"></MenuButton>
                </div>
                <div >
                    <MenuButton :icon="HistoryIcon" :label="'Riwayat'" :route="'History'"></MenuButton>
                </div>
                <div 
                    v-if="session.isLoggedIn && user.data && user.data.roles && user.data.user_type === 'System User'">
                    <button @click="openPopover" id="administrasi"
                        class="flex flex-col items-center w-full p-2 hover:bg-gray-100 transition-colors duration-200">
                        <div class="w-full flex justify-center items-center mb-1">
                            <svg v-html="EventIcon" class="w-6 h-6"></svg>
                        </div>
                        <span class="text-xs">Administrasi</span>
                    </button>
                    <ion-popover trigger="administrasi" side="top" alignment="center" animated="false"
                        :is-open="popoverOpen" @didDismiss="popoverOpen = false">
                        <ion-content class="ion-padding">
                            <h4 class="my-4 cursor-pointer" @click="toAccounting"
                                v-if="user.data.roles.includes('Non Profit Accounting')">Akuntansi</h4>
                            <h4 class="my-4 cursor-pointer" @click="toInventaris">Inventaris</h4>
                            <h4 class="my-4 cursor-pointer" @click="toEventInput"
                                v-if="user.data.roles.includes('Non Profit Secretary')">Kegiatan</h4>
                        </ion-content>
                    </ion-popover>
                </div>
                <div >
                    <MenuButton :icon="AccountIcon" :label="'Akun'" :route="'Account'"></MenuButton>
                </div>
            </div>
        </ion-toolbar>
    </ion-footer>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { IonFooter, IonToolbar, IonContent, IonPopover } from '@ionic/vue';
import MenuButton from '@/components/MenuButton.vue';
import HomeIcon from '@/components/icons/HomeIcon.svg?raw';
import HistoryIcon from '@/components/icons/HistoryIcon.svg?raw';
import AccountIcon from '@/components/icons/AccountIcon.svg?raw';
import EventIcon from '@/components/icons/EventIcon.svg?raw';

const user = inject('$user');
const session = inject('$session');
const router = useRouter();

const popoverOpen = ref(false);

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
</script>

<style scoped>
.menu-button-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.custom-button {
    margin: 3px;
}

ion-icon {
    margin-bottom: 10px;
}
</style>