<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content class="ion-padding">
            <h1 class="text-center my-4">Daftar Kelompok Barang</h1>
            <ion-list>
                <ion-card v-for="(group, index) in itemGroupList" :key="index" class="my-4 cursor-pointer"
                    @click="viewGroup(group)">
                    <ion-card-header>
                        <div class="flex justify-between items-center">
                            <ion-card-subtitle class="text-gray-600">{{ group.name }}</ion-card-subtitle>
                            <ion-icon :icon="GreaterThan" class="mx-2" />
                        </div>
                    </ion-card-header>
                </ion-card>
            </ion-list>
        </ion-content>
        <div class="flex justify-around items-center p-4">
            <ion-button @click="enableDeleteMode" color="danger" expand="block">Hapus</ion-button>
            <ion-button @click="openAddModal" expand="block">Tambah</ion-button>
        </div>
        <Footer />

        <!-- Overlay and Modal for Adding Group -->
        <div v-if="isAddModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
                <h2 class="text-lg font-semibold mb-4">Tambah Kelompok Barang</h2>
                <ion-item class="mb-4">
                    <ion-input v-model="newGroupName" label="Nama Kelompok" labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-button expand="block" @click="addGroup"
                    class="bg-blue-500 text-white rounded-md px-4 py-2 mb-2">Tambah</ion-button>
                <ion-button expand="block" color="medium" @click="closeAddModal"
                    class="bg-gray-500 text-white rounded-md px-4 py-2">Batal</ion-button>
            </div>
        </div>

        <!-- Overlay and Modal for Delete Confirmation -->
        <div v-if="isDeleteModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
                <h2 class="text-lg font-semibold mb-4">Hapus Kelompok Barang</h2>
                <p class="mb-4">Apakah Anda yakin ingin menghapus kelompok barang ini?</p>
                <ion-button expand="block" color="danger" @click="deleteSelectedGroups"
                    class="bg-red-500 text-white rounded-md px-4 py-2 mb-2">Hapus</ion-button>
                <ion-button expand="block" color="medium" @click="closeDeleteModal"
                    class="bg-gray-500 text-white rounded-md px-4 py-2">Batal</ion-button>
            </div>
        </div>

        <!-- Selection Mode -->
        <div v-if="isDeleteMode" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md w-4/5">
                <h2 class="text-lg font-semibold mb-4">Pilih Kelompok Barang untuk Dihapus</h2>
                <ion-list>
                    <ion-item v-for="(group, index) in itemGroupList" :key="index">
                        <ion-checkbox :checked="isSelected(group)" @ionChange="toggleSelection(group)"
                            justify="start" label-placement="end">{{ group.name }}</ion-checkbox>
                    </ion-item>
                </ion-list>
                <ion-button expand="block" color="danger" @click="confirmDeleteSelectedGroups"
                    class="bg-red-500 text-white rounded-md px-4 py-2 mb-2">Hapus</ion-button>
                <ion-button expand="block" color="medium" @click="cancelDeleteMode"
                    class="bg-gray-500 text-white rounded-md px-4 py-2">Batal</ion-button>
            </div>
        </div>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonIcon, IonButton, IonItem, IonInput, IonCheckbox } from '@ionic/vue'
import GreaterThan from '@/components/icons/greater-than.svg'
import { useRouter } from 'vue-router'
import { deleteItemGroups, itemGroupList, addItemGroup } from '@/data/secretary/Item'

const router = useRouter()
const isAddModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isDeleteMode = ref(false)
const newGroupName = ref('')
const selectedGroups = ref({})

const openAddModal = () => {
    isAddModalOpen.value = true
}

const closeAddModal = () => {
    isAddModalOpen.value = false
    newGroupName.value = ''
}

const addGroup = () => {
    if (newGroupName.value.trim()) {
        addItemGroup(newGroupName.value)
        window.location.reload()
        closeAddModal()
    } else {
        alert('Nama kelompok tidak boleh kosong')
    }
}

const enableDeleteMode = () => {
    isDeleteMode.value = true
}

const cancelDeleteMode = () => {
    isDeleteMode.value = false
    selectedGroups.value = {}
}

const confirmDeleteSelectedGroups = () => {
    isDeleteMode.value = false
    isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
    isDeleteModalOpen.value = false
    selectedGroups.value = {}
}

const deleteSelectedGroups = () => {
    deleteItemGroups(Object.values(selectedGroups.value))
    closeDeleteModal()
}

const viewGroup = (group) => {
    router.push(`/group/${group.name}`)
}

const isSelected = (group) => {
    return selectedGroups.value[group.name] !== undefined
}

const toggleSelection = (group) => {
    if (isSelected(group)) {
        delete selectedGroups.value[group.name]
    } else {
        selectedGroups.value[group.name] = group
    }
}
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}
</style>
