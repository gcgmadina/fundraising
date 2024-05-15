<template>
    <ion-page>
        <Header/>
        <ion-content>
            <ion-list>
                <ion-card v-for="account in bankAccountList" :key="account.id" @click="goToDetailPage(account.name)">
                    <ion-card-header>
                        {{ account.account_name }} - {{ account.bank }}
                    </ion-card-header>
                </ion-card>
            </ion-list>

            <ion-button expand="block" @click="goToAddAccountPage" class="mx-3">Add New Bank Account</ion-button>
        </ion-content>
        <Footer/>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonList, IonCard, IonCardHeader, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { bankAccountList } from '@/data/accounting/BankList';

const router = useRouter();

const goToDetailPage = (account) => {
    router.push({ name:'BankAccountDetail', params: { id: account } })
};

const goToAddAccountPage = () => {
    router.push({ name: 'AddBankAccount' });
};
</script>