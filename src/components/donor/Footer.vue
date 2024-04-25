<template>
    <ion-footer>
        <ion-toolbar>
            <div class="menu-button-list">
                <MenuButton 
                    :icon="HomeIcon"
                    :buttonsize=" 'small' "
                    :label="'Beranda'"
                    :route=" '/donor/' "
                ></MenuButton>
                <MenuButton
                    :icon="HistoryIcon"
                    :buttonsize=" 'small' "
                    :label="'History'"
                    :route=" '/history' "
                ></MenuButton>
                <MenuButton v-if="session.isLoggedIn && user.data && user.data.roles && user.data.roles.includes('Non Profit Secretary')"
                    :icon="EventIcon"
                    :buttonsize=" 'small' "
                    :label="'Kegiatan'"
                    :route=" '/event-input' "
                ></MenuButton>
                <MenuButton
                    :icon="AccountIcon"
                    :buttonsize=" 'small' "
                    :label="'Akun'"
                    :route=" '/account' "
                ></MenuButton>
            </div>
        </ion-toolbar>
    </ion-footer>
</template>

<script setup>
import { inject } from "vue"
import { IonFooter, IonToolbar } from "@ionic/vue"
import MenuButton from "@/components/MenuButton.vue"
import HomeIcon from "@/components/icons/HomeIcon.svg"
import QRIcon from "@/components/icons/QRIcon.svg"
import HistoryIcon from "@/components/icons/HistoryIcon.svg"
import AccountIcon from "@/components/icons/AccountIcon.svg"
import EventIcon from "@/components/icons/EventIcon.svg"

const user = inject('$user')
// console.log(user)
const session = inject('$session')
</script>

<style scoped>
MenuButton {
    margin: 0;
}
</style>