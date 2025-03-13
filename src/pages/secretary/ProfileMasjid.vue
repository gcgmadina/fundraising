<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <h1 class="text-center text-violet-900 font-bold mb-6">Ubah Profile Masjid</h1>

            <ion-segment class="my-8" value="on-going" mode="md" color="tertiary" v-model="currentSegment">
                <ion-segment-button value="profile">
                    <ion-label class="font-bold normal-case">Profil Masjid</ion-label>
                </ion-segment-button>
                <ion-segment-button value="about">
                    <ion-label class="font-bold normal-case">Tentang Masjid</ion-label>
                </ion-segment-button>
            </ion-segment>

            <div v-if="currentSegment == 'profile'">
                <form class="flex flex-col gap-4" @submit.prevent="submit">
                    <ion-input required name="masjid_name" label="Nama Masjid" label-placement="floating" fill="outline"
                        mode="md" placeholder="Masukkan nama masjid" v-model="masjid.masjid_name"></ion-input>
                    <ion-input name="address_line" label="Alamat Masjid" label-placement="floating" fill="outline"
                        mode="md" placeholder="Jln. xxx, no. xx, Kec.xxx" v-model="masjid.address_line"></ion-input>
                    <div class="flex gap-1">
                        <ion-input name="pincode" label="Kode Pos" label-placement="floating" fill="outline" mode="md"
                            class="w-1/2" placeholder="XXXX" v-model="masjid.pincode"></ion-input>
                        <div class="flex flex-col w-1/2 relative">
                            <ion-searchbar id="searchCity" name="city" v-model="searchQuery" mode="md"
                                placeholder="Kota/Kabupaten" @click="showFilteredCityList"></ion-searchbar>

                            <ion-list v-if="showCityList"
                                class="absolute top-full left-0 w-full bg-white shadow-lg z-10">
                                <ion-item v-for="city in filteredCities" @click="chooseCity(city.lokasi)">{{ city.lokasi
                                }}</ion-item>
                            </ion-list>
                        </div>
                    </div>
                    <ion-input name="phone" label="Nomor telepon" type="tel" pattern="08[0-9]{8,10}"
                        label-placement="floating" fill="outline" mode="md" placeholder="+62-XXX-XXXX-XXXX"
                        v-model="masjid.phone"></ion-input>
                    <ion-input name="email_id" label="Email" type="email" label-placement="floating" fill="outline"
                        mode="md" placeholder="example@domain.com" v-model="masjid.email_id"></ion-input>

                    <ion-label>Gambar Masjid</ion-label>
                    <div class="flex justify-between items-center">
                        <FileUploader :fileTypes="['image/*']" :validateFile="validateFileFunction" @success="onSuccess">
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
                        <img v-if="masjid.logo" :src="masjid.logo" alt="">
                    </div>

                    <ion-button type="submit" expand="block">Simpan Profil</ion-button>
                </form>
            </div>
            <div v-if="currentSegment == 'about'">
                <AboutMasjid></AboutMasjid>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { ref, onMounted, computed } from 'vue';
import { IonSegmentButton, IonSegment, IonLabel, IonList, IonItem, IonInput, IonSearchbar, IonButton } from "@ionic/vue"
import { fetchAllCities } from '@/data/masjid/Address';
import Fuse from "fuse.js";
import { masjidProfile } from '@/data/masjid/MasjidProfile.js';
import { FileUploader } from 'frappe-ui';
import AboutMasjid from './ProfileMasjidAbout.vue';

const masjid = ref({});
const currentSegment = ref('profile');
const cities = ref([]);
const searchQuery = ref("");
const showCityList = ref(false);
let fuse = null;

onMounted(async () => {
    cities.value = await fetchAllCities();
    fuse = new Fuse(cities.value, {
        keys: ['lokasi'],
        threshold: 1,
    });

    masjid.value = await masjidProfile.getProfile.fetch();
    searchQuery.value = masjid.value.city;
});

const filteredCities = computed(() => {
    if (!searchQuery.value || !fuse) {
        return cities.value;
    }
    return fuse.search(searchQuery.value).map(result => result.item);
});

function showFilteredCityList() {
    showCityList.value = true;
}

function chooseCity(city) {
    searchQuery.value = city;
    showCityList.value = false;
}

const submit = async (e) => {
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.logo = masjid.value.logo;
    // console.log(data);

    await masjidProfile.updateProfile.submit(data)
};

const validateFileFunction = (fileObject) => { 
    if (fileObject.size > 2000000) {
        alert('File size should be less than 2MB');
        return false;
    }
    return true;
}
const onSuccess = (file) => {
    masjid.value.logo = file.file_url;
}
</script>
