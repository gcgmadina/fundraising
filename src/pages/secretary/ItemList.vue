<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content>
            <h1 class="text-center my-4">{{ router.currentRoute.value.params.group }}</h1>
            <ion-list>
                <ion-card v-for="item in itemList" :key="item.name">
                    <ion-card-header>
                        <div class="flex flex-auto justify-between items-center">
                            <ion-card-subtitle>{{ item.name }}</ion-card-subtitle>
                            <ion-button fill="clear" @click="deleteItem(item.name)">
                                <ion-icon slot="icon-only" :icon="trashCan"></ion-icon>
                            </ion-button>
                        </div>
                    </ion-card-header>
                </ion-card>
            </ion-list>
        </ion-content>
        <ion-footer class="px-5 py-2">
            <ion-button 
                expand="block" 
                @click="addItem(router.currentRoute.value.params.group, router.currentRoute.value.params.assetCategory)">
                Tambah Daftar {{ router.currentRoute.value.params.group }}
            </ion-button>
        </ion-footer>
        <Footer/>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonButton, IonFooter, IonIcon } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { itemResource, itemList } from '@/data/secretary/Item'
import { ref, onMounted, onUnmounted } from 'vue'
import trashCan from '@/components/icons/trash-can.svg'
import { deleteDocument } from '@/data/Document'

const router = useRouter()

onMounted(() => {
    const group = router.currentRoute.value.params.group;
    const assetCategory = router.currentRoute.value.params.assetCategory || null;
    if (group === "Aset Tetap" && assetCategory) {
        itemResource(group, assetCategory);
    } else {
        itemResource(group);
    }
})

onUnmounted(() => {
    window.location.reload()
})

const addItem = (group, assetCategory = null) => {
    if (group === "Aset Tetap" && assetCategory) {
        router.push({ name: 'AddItem', params: { group: group, assetCategory: assetCategory } });
    } else {
        router.push({ name: 'AddItem', params: { group: group } });
    }
}

const deleteItem = async (name) => {
    deleteDocument('Item', name)
}
</script>