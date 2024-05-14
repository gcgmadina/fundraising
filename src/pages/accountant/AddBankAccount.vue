<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-select v-model="bankName" label="Nama Bank" >
                        <ion-select-option v-for="bank in bankList" 
                            :key="bank.id" 
                            :value="bank.id">
                        {{ bank.name }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-input v-model="accountName" label="Pemilik Rekening" labelPlacement="floating"/>
                </ion-item>
                <ion-item>
                    <ion-input v-model="accountNumber" label="Nomor Rekening" labelPlacement="floating" type="number"/>
                </ion-item>
                <ion-button @click="submitForm" :disabled="!isValidForm">Submit</ion-button>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import { bankList } from '@/data/accounting/BankList';
import { createResource } from "frappe-ui"
import { useRouter } from 'vue-router';

const bankName = ref('');
const accountName = ref('');
const accountNumber = ref('');

const isValidForm = computed(() => {
    return bankName.value && accountName.value && accountNumber.value;
});

const submitForm = () => {
    let postBankAccount = createResource ({
        method: 'POST',
        url: 'non_profit.api.fundraising.new_bank_account',
        params: {
            bank_name: bankName.value,
            account_name: accountName.value,
            account_number: accountNumber.value
        },
        onSuccess: (response) => {
            console.log(response);
            router.push({ name: 'bank-account' });
        },
        onError: (error) => {
            console.log(error);
        }
    })
    postBankAccount.reload();
};
</script>