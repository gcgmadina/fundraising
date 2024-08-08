<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-input v-model="address.name" required type="text" label="Nama Masjid"
                        labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input v-model="address.address_line1" type="text" label="Alamat"
                        labelPlacement="floating"></ion-input>
                </ion-item>
                <div class="flex space-x-4">
                    <ion-item class="flex-1">
                        <ion-input v-model="citySearch" type="text" label="Cari Kota" labelPlacement="floating"
                            @input="onCitySearch"></ion-input>
                    </ion-item>
                    <ion-item class="flex-1">
                        <ion-select v-model="address.city" label="Pilih Kota">
                            <ion-select-option v-for="city in filteredCities" :key="city.id" :value="city.lokasi">
                                {{ city.lokasi }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                </div>
                <ion-item>
                    <ion-input v-model="address.province" type="text" label="Provinsi"
                        labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input v-model="address.postalcode" type="text" label="Kode Pos"
                        labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input v-model="address.country" type="text" label="Negara" labelPlacement="floating"
                        :disabled="true"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input v-model="address.phone" type="text" label="Nomor Telepon"
                        labelPlacement="floating"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input v-model="address.email" type="email" label="Email" labelPlacement="floating"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label>Gambar Masjid</ion-label>
                    <FileUploader :fileTypes="['image/*']" :validateFile="validateFileFunction"
                            @success="onSuccess">
                            <template v-slot="{
                                file,
                                uploading,
                                progress,
                                uploaded,
                                message,
                                error,
                                total,
                                success,
                                openFileSelector,
                            }" class="flex flex-row justify-between">
                                <Button @click="openFileSelector" :loading="uploading">
                                    {{ uploading ? `Uploading ${progress}%` : 'Upload Image' }}
                                </Button>
                            </template>
                        </FileUploader>
                </ion-item>

                <div v-if="address.image" class="flex justify-between mx-16 m-8">
                    <img :src="address.image" alt="Preview Image" style="max-width: 200px; max-height: 200px;">
                </div>
            </ion-list>
            <div class="flex justify-end">
                <ion-button @click="submitForm">Simpan</ion-button>
            </div>

            <SuccsessModal 
                :isModalOpen="isModalOpen" 
                :validationSuccess="validationSuccess" 
                :closeModal="closeModal"
                :successMessage="successMessage"
                :failureMessage="failureMessage"
            />
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonSelect, IonSelectOption, IonLabel } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { fetchAllCities, searchCity, addAddress, editMosqueAddress, getMosqueAddress } from '@/data/masjid/Address';
import SuccsessModal from '@/components/SuccessModal.vue';
import { FileUploader, Button } from 'frappe-ui';

const address = ref({
    name: '',
    address_line1: '',
    city: '',
    province: '',
    postalcode: '',
    country: 'Indonesia', // Default country
    phone: '',
    email: '', 
    image: ''
});

const router = useRouter();

const citySearch = ref('');
const allCities = ref([]);
const filteredCities = ref([]);
const isEditMode = ref(false);

const loadCities = async () => {
    try {
        const cities = await fetchAllCities();
        allCities.value = cities;
        filteredCities.value = cities;
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
};

const onCitySearch = async () => {
    if (citySearch.value.trim() === '') {
        filteredCities.value = allCities.value;
    } else {
        try {
            const cities = await searchCity(citySearch.value);
            filteredCities.value = cities;
        } catch (error) {
            console.error('Error searching city:', error);
        }
    }
};

const validateFileFunction = (fileObject) => { }
const onSuccess = (file) => {
    address.value.image = file.file_url;
}

onMounted(() => {
    loadCities();

    getMosqueAddress()
        .then((message) => {
            if (message) {
                address.value = {
                    name: message.address_title || '',
                    address_line1: message.address_line1 || '',
                    city: message.city || '',
                    province: message.state || '',
                    postalcode: message.pincode || '',
                    country: message.country || 'Indonesia',
                    phone: message.phone || '',
                    email: message.email_id || '',
                    image: message.image || ''
                };
                isEditMode.value = true;  // Set mode to edit
            }
        })
        .catch((error) => {
            console.error('Error fetching mosque address:', error);
        });
});


const isModalOpen = ref(false);
const validationSuccess = ref(false);
const closeModal = () => {
    isModalOpen.value = false;

    if (validationSuccess.value) {
        router.back();
    }
};
const successMessage = ref('');
const failureMessage = ref('');

const submitForm = () => {
    if (isEditMode.value) {
        editMosqueAddress(address.value)
            .then((message) => {
                console.log('Address edited:', message);
                successMessage.value = 'Alamat berhasil diubah';
                validationSuccess.value = true;
                isModalOpen.value = true;
            })
            .catch((error) => {
                console.error('Error editing address:', error);
                failureMessage.value = 'Gagal mengubah alamat';
                validationSuccess.value = false;
                isModalOpen.value = true;
            });
    } else {
        addAddress(address.value, true)
            .then((message) => {
                console.log('Address added:', message);
                successMessage.value = 'Alamat berhasil ditambahkan';
                validationSuccess.value = true;
                isModalOpen.value = true;
            })
            .catch((error) => {
                console.error('Error adding address:', error);
                failureMessage.value = 'Gagal menambahkan alamat';
                validationSuccess.value = false;
                isModalOpen.value = true;
            });
    }
};
</script>
