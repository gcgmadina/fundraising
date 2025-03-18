<template>
    <BaseLayout>
        <template #content>
            <h1 class="font-medium text-violet-900">Daftar Rekening Bank</h1>
            <ion-list>
                <ion-card v-for="account in bankAccountList" class="flex justify-between items-center p-4">
                    <!-- <ion-card-header>
                    </ion-card-header> -->

                    <ion-card-header class="w-[30%]">
                        <!-- <ion-card-title class="text-violet-800 font-semibold overflow-hidden  text-ellipsis line-clamp-2"> -->
                        <ion-card-title class="text-violet-800 text-base overflow-hidden  text-ellipsis line-clamp-2">

                            {{ account.account_name }}
                        </ion-card-title>
                    </ion-card-header>
                    <div class="w-[40%] flex justify-center">
                        <p class="text-base overflow-hidden  text-ellipsis line-clamp-2">
                            {{ account.bank }}
                        </p>
                    </div>
                    <div class="flex flex-col">
                        <ion-button color="warning" mode="md" size="small" @click="router.push({ name: 'BankAccountDetail', params: { id: account.name } })">
                            <ion-icon :icon="create" slot="start" color="light"></ion-icon>
                            <p class="text-white normal-case">
                                Edit
                            </p>
                        </ion-button>
                        <ion-button color="danger" mode="md" size="small" @click="openDeleteModal(account)">
                            <ion-icon :icon="trashBin" slot="start"></ion-icon>
                            <p class="text-white normal-case">
                                Hapus
                            </p>
                        </ion-button>
                    </div>
                </ion-card>
            </ion-list>

            <ion-modal :is-open="deleteModal" :initial-breakpoint=".3" :breakpoints="[0, .25, .3, .5, 0.8, 1]"
                backdropDismiss="true" @didDismiss="closeDeleteModal">
                <div class="p-4">
                    <h2>Apakah Anda yakin ingin menghapus rekening bank atas nama:
                        <p class="text-basic text-gray-700">{{ bankAccountToDelete?.name }}</p> ?
                    </h2>
                    <div class="flex justify-end gap-2 my-4">
                        <ion-button color="danger" @click="deleteBankAccount">
                            <ion-icon :icon="trashBin" slot="start"></ion-icon>
                            Hapus
                        </ion-button>
                        <ion-button color="light" @click="closeDeleteModal">
                            <ion-icon :icon="closeCircle" slot="start"></ion-icon>
                            Batal
                        </ion-button>
                    </div>
                </div>
            </ion-modal>
        </template>
        <template #footer>
            <ion-button expand="block" @click="goToAddAccountPage" class="mx-3">
                <ion-icon :icon="addCircle" slot="start"></ion-icon>
                Tambah Rekening
            </ion-button>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonList, IonCard, IonCardHeader, IonCardTitle, IonIcon, IonButton, IonModal } from '@ionic/vue';
import { bankAccountList } from '@/data/accounting/BankList';
import { create, trashBin, addCircle, closeCircle } from 'ionicons/icons';
import { deleteDocument } from '@/data/Document';
import { toast } from 'frappe-ui';

const router = useRouter();

const goToDetailPage = (account) => {
    router.push({ name: 'BankAccountDetail', params: { id: account } })
};

const goToAddAccountPage = () => {
    router.push({ name: 'AddBankAccount' });
};

const deleteModal = ref(false);
const bankAccountToDelete = ref(null);

const openDeleteModal = (bank) => {
    deleteModal.value = true;
    bankAccountToDelete.value = bank;
}

const closeDeleteModal = () => {
    deleteModal.value = false;
    setTimeout(() => {
        bankAccountToDelete.value = null;
    }, 300); // Tambahkan delay agar tidak merender null sebelum modal tertutup
};

const deleteBankAccount = () => {

    deleteDocument('Bank Account', bankAccountToDelete.value.name).then(() => {

        closeDeleteModal();

        toast({
            title: "Berhasil",
            text: "Rekening bank berhasil dihapus",
            icon: "check",
            position: "bottom-center",
            iconClasses: "text-green-500"
        })
    }).catch((response) => {
        toast({
            title: "Gagal",
            text: response.message,
            icon: "x-circle",
            position: "bottom-center",
            iconClasses: "text-red-500"
        })
    });

}
</script>