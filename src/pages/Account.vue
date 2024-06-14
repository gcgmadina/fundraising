<template>
    <ion-page>
        <Header />
        <ion-content class="ion-padding flex items-center justify-center h-full">
            <div class="text-center">
                <!-- Foto Profil -->
                <div class="w-24 h-24 overflow-hidden rounded-full mx-auto mb-4">
                    <img :src="user.data.user_image" alt="Profile Picture" class="object-cover w-full h-full" />
                </div>

                <!-- Nama Lengkap -->
                <h2 class="text-xl font-semibold mb-2">{{ user.data.full_name }}</h2>

                <!-- Email -->
                <p class="text-gray-500 mb-4">{{ user.data.email }}</p>

                <!-- Tombol Login dan Logout -->
                <div>
                    <IonButton v-if="!session.isLoggedIn" @click="router.push({path: '/account/login'})">
                        Login
                    </IonButton>
                    <IonButton v-else @click="session.logout.submit()">
                        Logout
                    </IonButton>
                </div>
            </div>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = inject('$user');
const session = inject('$session');
</script>