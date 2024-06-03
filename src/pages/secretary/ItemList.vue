<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content>
            <h1 class="text-center my-4">{{ router.currentRoute.value.params.group }}</h1>
            <ion-list>
                <ion-card v-for="item in itemList">
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>{{ item.name }}</ion-card-subtitle>
                        </div>
                    </ion-card-header>
                </ion-card>
            </ion-list>
        </ion-content>
        <ion-footer class="px-5 py-2">
            <ion-button expand="block" @click="addItem(router.currentRoute.value.params.group)">Tambah Daftar {{
            router.currentRoute.value.params.group }}</ion-button>
        </ion-footer>
        <Footer/>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonButton, IonFooter } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { itemResource, itemList } from '@/data/secretary/Item'
import { ref, onMounted, onUnmounted } from 'vue'

const router = useRouter()

onMounted(() => {
    itemResource(router.currentRoute.value.params.group)
})

onUnmounted(() => {
    window.location.reload()
})

const addItem = (item) => {
    router.push({ name: 'AddItem', params: { group: item } })
}
</script>