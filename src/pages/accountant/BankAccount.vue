<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content class="ion-padding">
            <div v-if="loading && props.mode === 'edit'" class="w-full h-48 bg-gray-300 animate-pulse"></div>
            <div v-else>
                <ion-list>
                    <ion-item>
                        <ion-select v-model="bankAccount.bank" label="Nama Bank">
                            <ion-select-option v-for="bank in bankList" :key="bank.id" :value="bank.id">
                                {{ bank.name }}</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-input v-model="bankAccount.account_name" label="Pemilik Rekening"
                            labelPlacement="floating" />
                    </ion-item>
                    <ion-item>
                        <ion-input v-model="bankAccount.bank_account_no" label="Nomor Rekening"
                            labelPlacement="floating" type="number" />
                    </ion-item>
                    <ion-button @click="submitForm" :disabled="!isValidForm">Submit</ion-button>
                    <ion-button v-if="props.mode === 'edit'" color="danger" @click="deleteBankAccount">Delete</ion-button>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import { bankList, getBankById, editBankAccount } from '@/data/accounting/BankList';
import { createResource } from "frappe-ui"
import { useRouter } from 'vue-router';
import { deleteDocument } from '@/data/Document';

const props = defineProps({
    mode: String,
    id: String
});

const bankAccount = ref({
    bank: undefined,
    account_name: undefined,
    bank_account_no: undefined
});

const originalBankAccount = ref({
    bank: undefined,
    account_name: undefined,
    bank_account_no: undefined
});

const loading = ref(true);
const router = useRouter();

const isValidForm = computed(() => {
    if (props.mode === 'edit') {
        return bankAccount.value.bank && 
               bankAccount.value.account_name && 
               bankAccount.value.bank_account_no &&
               (bankAccount.value.bank !== originalBankAccount.value.bank ||
                bankAccount.value.account_name !== originalBankAccount.value.account_name ||
                bankAccount.value.bank_account_no !== originalBankAccount.value.bank_account_no);
    } else {
        return bankAccount.value.bank && 
               bankAccount.value.account_name && 
               bankAccount.value.bank_account_no;
    }
});

const submitForm = () => {
    // console.log(bankAccount.value);
    if (props.mode === 'edit') {
        editBankAccount(bankAccount.value).then(response => {
            console.log("Bank account edited:", response);
            router.push({ name: 'BankAccount' });
        }).catch(error => {
            console.error("Failed to edit bank account:", error);
        });
    } else {
        console.log(bankAccount.value);
        let postBankAccount = createResource({
            method: 'POST',
            url: 'non_profit.api.fundraising.new_bank_account',
            params: {
                bank_name: bankAccount.value.bank,
                account_name: bankAccount.value.account_name,
                account_number: bankAccount.value.bank_account_no
            },
            onSuccess: (response) => {
                console.log(response);
                router.push({ name: 'BankAccount' });
            },
            onError: (error) => {
                console.log(error);
            }
        })
        postBankAccount.reload();
    }
};

const deleteBankAccount = () => {
    deleteDocument('Bank Account', props.id).then(response => {
        console.log("Bank account deleted:", response);
        router.push({ name: 'BankAccount' });
    }).catch(error => {
        console.error("Failed to delete bank account:", error);
    });
};

onMounted(() => {
    if (props.mode === 'edit') {
        loading.value = true;  // Pastikan untuk menggunakan .value untuk mengakses atau mutasi ref
        const bankDetails = getBankById(props.id);
        bankDetails.reload().then(response => {
            // Object.assign(bankAccount.value, response.data);
            Object.assign(bankAccount.value, bankDetails.data);
            Object.assign(originalBankAccount.value, bankDetails.data);
            console.log(bankDetails)
            loading.value = false;  // Pastikan untuk menggunakan .value untuk mengakses atau mutasi ref
        }).catch(error => {
            console.error("Failed to load bank details:", error);
            loading.value = false;  // Pastikan untuk menangani error dan set loading false
        });
    } else {
        loading.value = false;  // Jika tidak dalam mode edit, tidak perlu loading
    }

    console.log(props.id, " ", props.mode)
    // console.log(bankAccount.value)  // Akses bankAccount dengan .value untuk log
});
</script>