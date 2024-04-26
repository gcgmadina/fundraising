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
                <ion-button v-if="session.isLoggedIn && user.data && user.data.roles && user.data.user_type === 'System User'" 
                            id="administrasi" fill="clear" size="small" @click="openPopover($event)">
                    <div class="custom-button flex flex-col items-center"> 
                        <ion-icon :icon="EventIcon" size="large" ></ion-icon> 
                        <div class="menuname">Kegiatan</div>
                    </div>
                </ion-button>
                <ion-popover v-if="session.isLoggedIn && user.data && user.data.roles && user.data.user_type === 'System User'"
                            trigger="administrasi" side="top" aligment="center" animated="false"
                            :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen == false">
                    <ion-content class="ion-padding">
                        <h4 class="my-4" v-if="session.isLoggedIn && user.data && user.data.roles && user.data.roles.includes('Non Profit Accounting')">Akuntansi</h4>
                        <h4 class="my-4">Inventaris</h4>
                        <router-link :to="{ name: 'EventInput' }" @click.native="closePopover">
                            <h4 class="my-4" v-if="session.isLoggedIn && user.data && user.data.roles && user.data.roles.includes('Non Profit Secretary')">Kegiatan</h4>
                        </router-link>
                    </ion-content>
                </ion-popover>

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
import { inject, ref } from "vue"
import { IonFooter, IonToolbar, IonButton, IonIcon, IonContent, IonPopover } from "@ionic/vue"
import MenuButton from "@/components/MenuButton.vue"
import HomeIcon from "@/components/icons/HomeIcon.svg"
import QRIcon from "@/components/icons/QRIcon.svg"
import HistoryIcon from "@/components/icons/HistoryIcon.svg"
import AccountIcon from "@/components/icons/AccountIcon.svg"
import EventIcon from "@/components/icons/EventIcon.svg"

const user = inject('$user')
// console.log(user)
const session = inject('$session')

const popoverOpen = ref(false);
let event = null;

const openPopover = (e) => {
  event = e;
  popoverOpen.value = true;
};

const closePopover = () => {
  popoverOpen.value = false;
};
</script>

<style scoped>
MenuButton {
    margin: 0;
}

.custom-button {
    margin: 3px;
}

ion-icon {
    margin-bottom: 10px;
}
</style>