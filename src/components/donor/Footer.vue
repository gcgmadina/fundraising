<template>
    <ion-footer>
        <ion-toolbar>
            <div class="menu-button-list">
            <MenuButton
                v-for="menu in menus"
                :key="menu.route"
                :icon="menu.icon"
                :buttonsize=" 'small' "
                :label="menu.label"
                :route="menu.route"
            ></MenuButton>
            </div>
        </ion-toolbar>
    </ion-footer>
</template>

<script setup>
import { IonFooter, IonToolbar } from "@ionic/vue"
import MenuButton from "@/components/MenuButton.vue"
import HomeIcon from "@/components/icons/HomeIcon.svg"
import QRIcon from "@/components/icons/QRIcon.svg"
import HistoryIcon from "@/components/icons/HistoryIcon.svg"
import AccountIcon from "@/components/icons/AccountIcon.svg"
import EventIcon from "@/components/icons/EventIcon.svg"

// Data untuk menu
const menus = [
    { icon: HomeIcon, label: 'Beranda', route: '/donor/' },
    // { icon: ZakatIcon, label: 'Kegiatan', route: '/donor/kegiatan' },
    { icon: HistoryIcon, label: 'History', route: '/history' }, 
    // { icon: ZakatIcon, label: 'Laporan', route: '/donor/laporan' }, 
    { icon: EventIcon, label: 'Kegiatan', route: '/event-input' },
    { icon: AccountIcon, label: 'Akun', route: '/account' }, 
];
</script>

<style scoped>
MenuButton {
    margin: 0;
}
</style>