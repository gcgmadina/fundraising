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
                        mode="md" placeholder="Masukkan nama masjid"></ion-input>
                    <ion-input name="address_line" label="Alamat Masjid" label-placement="floating"
                        fill="outline" mode="md" placeholder="Jln. xxx, no. xx, Kec.xxx"></ion-input>
                    <div class="flex gap-1">
                        <ion-input name="pincode" label="Kode Pos" label-placement="floating" fill="outline" mode="md" class="w-1/2" placeholder="XXXX"></ion-input>
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
                    <ion-input name="phone" label="Nomor telepon" label-placement="floating" fill="outline" mode="md" placeholder="+62-XXX-XXXX-XXXX"></ion-input>
                    <ion-input name="email_id" label="Email" label-placement="floating" fill="outline" mode="md" placeholder="example@domain.com"></ion-input>
                    <ion-button type="submit" expand="block">Simpan Profil</ion-button>
                </form>
            </div>
            <div v-if="currentSegment == 'about'"></div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { ref, onMounted, computed } from 'vue';
import { IonSegmentButton, IonSegment, IonLabel, IonList, IonItem, IonInput, IonSearchbar, IonButton } from "@ionic/vue"
import { fetchAllCities } from '@/data/masjid/Address';
import Fuse from "fuse.js";
import PhoneInput from '@/components/PhoneInput.vue';

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

const submit = (e) => {
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
};
</script>
