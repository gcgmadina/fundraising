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
import ZakatIcon from "@/components/icons/ZakatIcon.svg"

// Data untuk menu
const menus = [
    { icon: ZakatIcon, label: 'Beranda', route: '/donor/' },
    // { icon: ZakatIcon, label: 'Kegiatan', route: '/donor/kegiatan' },
    { icon: ZakatIcon, label: 'Donasi', route: '/donor/donasi' }, 
    // { icon: ZakatIcon, label: 'Laporan', route: '/donor/laporan' }, 
    { icon: ZakatIcon, label: 'Akun', route: '/donor/akun' }, 
];
</script>

<style scoped>
MenuButton {
    margin: 0;
}
</style>