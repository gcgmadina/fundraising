<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <!-- Mencegah Scroll -->
            <div class="fixed inset-0 overflow-hidden">
                <!-- Background Fullscreen -->
                <div class="absolute inset-0 bg-cover bg-center" :style="`background-image: url('${masjid}')`">
                </div>

                <!-- Overlay Gelap -->
                <div class="absolute inset-0 bg-black/50"></div>

                <!-- Kontainer Konten di Tengah -->
                <div class="relative flex justify-center items-center h-screen w-full px-4">
                    <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <img src="@/components/icons/WhatsApp_Image_2023-12-18_at_10.48.59_9397a2c2-removebg-preview (1).jpg"
                            alt="GCG Madina Logo" class="w-40 mx-auto mb-4" />
                        <div class="flex gap-6 my-6">
                            <img src="@/components/icons/profile_image.jpeg" alt="">
                            <div class="flex flex-col justify-left gap-2">
                                <h3 class="font-semibold text-violet-900 text-left">{{ user.data.full_name }}</h3>
                                <p class="text-xl">{{ user.data.email }}</p>
                            </div>
                        </div>
                        <p class="font-medium text-violet-900">Akun anda</p>
                        <!-- <div class="flex justify-between items-center p-4 border-b-2">
                            <div class="flex gap-4">
                                <img src="@/components/icons/user-edit.svg" alt="">
                                <p class="text-gray-600">Ubah Profile</p>
                            </div>
                            <ion-icon :icon="chevronForward" slot="end" color="tertiary"></ion-icon>
                        </div> -->
                        <div id="changePassword" class="flex justify-between items-center p-4 border-b-2"
                            @click="openChangePasswordModal">
                            <div class="flex gap-4">
                                <img src="@/components/icons/lock.svg" alt="">
                                <p class="text-gray-600">Ganti Password</p>
                            </div>
                            <ion-icon :icon="chevronForward" slot="end" color="tertiary"></ion-icon>
                        </div>
                        <div class="my-4">
                            <IonButton v-if="!session.isLoggedIn" expand="block"
                                @click="router.push({ path: '/account/login' })">
                                Login
                            </IonButton>
                            <IonButton v-else @click="session.logout.submit()" expand="block">
                                Logout
                            </IonButton>
                        </div>
                    </div>
                </div>
            </div>

            <!-- change password modal -->
            <ion-modal :is-open="isChangePasswordModalOpen" @didDismiss="closeChangePasswordModal"
                :initial-breakpoint="0.5"
                :breakpoints="[0, 0.5, 0.6]" 
                :backdropDismiss="true"
                mode="ios"
                >
                <form class="flex flex-col space-y-4 p-4" @submit.prevent="submitPassword">
                    <ion-input name="old_password" label-placement="floating" label="Old Password"
                        type="password"></ion-input>
                    <ion-input name="new_password" label-placement="floating" label="New Password"
                        type="password"></ion-input>
                    <ion-input name="confirm_password" label-placement="floating" label="Confirm Password"
                        type="password"></ion-input>
                    <ion-button expand="block" type="submit">Change Password</ion-button>
                </form>
            </ion-modal>

        </template>
    </BaseLayout>
</template>

<script setup>
import { inject, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseLayout from '@/components/BaseLayout.vue';
import masjid from "@/components/icons/mosque_image.jpg";
import { chevronForward } from 'ionicons/icons';
import { IonIcon, IonButton, IonModal, IonInput } from '@ionic/vue';
import { createResource, toast } from "frappe-ui"

const router = useRouter();
const user = inject('$user');
const session = inject('$session');

const isChangePasswordModalOpen = ref(false)

const openChangePasswordModal = () => {
    isChangePasswordModalOpen.value = true
}

const closeChangePasswordModal = () => {
    isChangePasswordModalOpen.value = false
}

const submitPassword = async (e) => {
    let formData = new FormData(e.target)
    console.log(formData.get('old_password'), formData.get('new_password'), formData.get('confirm_password'))

    if (!formData.get('old_password') || !formData.get('new_password') || !formData.get('confirm_password')) {
        toast({
            title: "All fields are required!",
            text: "Please fill in all the fields.",
            icon: "alert-circle",
            position: "bottom-center",
            iconClasses: "text-red-500",
        })
        return
    }

    if (formData.get('new_password') !== formData.get('confirm_password')) {
        toast({
            title: "Passwords do not match!",
            text: "Please ensure that the new password and confirm password match.",
            icon: "alert-circle",
            position: "bottom-center",
            iconClasses: "text-red-500",
        })
        return
    }

    try {
        await changePassword.resource.submit({
            old_password: formData.get('old_password'),
            new_password: formData.get('new_password'),
        })
        closeChangePasswordModal()
        console.log(isChangePasswordModalOpen.value)
    } catch (e) {
        const msg = "An error occurred while updating the password!"
        console.error(msg, e)
    }
}

const changePassword = reactive({
    resource: createResource({
        url: 'frappe.core.doctype.user.user.update_password',
        auto: false,
        makeParams({ old_password, new_password }) {
            return {
                new_password: new_password,
                old_password: old_password,
            }
        },
        onSuccess(response) {
            // router.back()
            toast({
                title: "Success",
                text: "Berhasil mengubah password",
                icon: "check-circle",
                position: "bottom-center",
                iconClasses: "text-green-500",
            });
        },
        onError(error) {
            toast({
                title: "Error",
                text: "Gagal mengubah password",
                icon: "x-circle",
                position: "bottom-center",
                iconClasses: "text-red-500",
            });
        },
    }),
});
</script>