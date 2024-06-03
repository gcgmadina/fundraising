<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content>
            <h1 class="text-center my-4">Buat {{ router.currentRoute.value.params.group }} Baru</h1>
            <ion-list>
                <ion-item>
                    <ion-input v-model="name" type="text" label="Nama Barang" labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-select v-model="uom" label="Satuan">
                        <ion-select-option v-for="option in uomList" :key="option.name" :value="option.name">{{ option.name }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-button @click="submitItem" :disabled="isValidForm" expand="block" class="m-4">Selesai</ion-button>
            </ion-list>
        </ion-content>
        <Footer/>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { uomList, addItem } from '@/data/secretary/Item'
import { ref, computed } from 'vue'

const router = useRouter()
const name = ref('')
const uom = ref(null)

const isValidForm = computed(() => {
    return !name.value || !uom.value
})

const submitItem = () => {
    // console.log(name.value, uom.value)
    let item = {
        name: name.value,
        uom: uom.value
    }
    console.log(router.currentRoute.value.params.group)
    console.log(item)
    addItem(router.currentRoute.value.params.group, item)
}
</script>
