<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <img :src="masjid.image" alt="" class="w-full h-60 object-cover rounded-lg" />
            <h1 class="font-bold text-blue-900">Profil Masjid</h1>
            <h3 class="font-semibold text-blue-800">{{ masjid.masjid_name }}</h3>
            <div class="flex text-blue-800 mb-8">
                <div class="flex flex-col gap-1 w-1/2">
                    <p v-if="masjid.address_line">{{ masjid.address_line }}</p>
                    <p v-if="masjid.city">{{ masjid.city }}</p>
                    <p v-if="masjid.pincode">Kode pos: {{ masjid.pincode }}</p>
                </div>
                <div class="flex flex-col gap-1 w-1/2">
                    <p v-if="masjid.phone">{{ masjid.phone }}</p>
                    <p v-if="masjid.email_id">{{ masjid.email_id }}</p>
                </div>
            </div>
            <h3 class="font-semibold">{{ masjid.title }}</h3>
            <div v-html="masjid.description" class="quill-content"></div>
        </template>
        <template #footer>
            <div class="p-2" v-if="session.isLoggedIn && user.data && user.data.roles?.includes('Non Profit Secretary')">
                <ion-button expand="block" @click='router.push({name: "MasjidProfileEdit"})'>Ubah Profil</ion-button>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import { onMounted, ref, inject, computed } from "vue";
import { useRouter } from "vue-router";
import BaseLayout from "@/components/BaseLayout.vue";
import { masjidProfile } from "@/data/masjid/MasjidProfile.js"
import { IonButton } from "@ionic/vue";

const router = useRouter();
const user = inject('$user');
const session = inject('$session');
const masjid = ref({});

onMounted(async () => {
    masjid.value = await masjidProfile.getProfile.fetch();
});
</script>