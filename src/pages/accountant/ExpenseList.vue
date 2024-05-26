<template>
    <ion-page>
        <Header/>
        <ion-content class="ion-padding" @ionInfinite="loadData">
            <h1 class="text-center my-auto">{{router.currentRoute.value.params.name}}</h1>
            <ion-list>
                <ion-card v-for="expense, index in expensesData" :key="index" class="px-2 py-4">
                    <ion-card-header>
                        <ion-card-title>{{ expense.debit_in_account_currency }}</ion-card-title>
                        <ion-card-subtitle>{{ expense.posting_date }}</ion-card-subtitle>
                    </ion-card-header>
                </ion-card>
            </ion-list>
            <ion-infinite-scroll threshold="100px" @ionInfinite="loadData" :disabled="loadDisabled.value">
                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
        <ion-footer class="px-5 py-2">
            <ion-button expand="block" @click="addExpense(router.currentRoute.value.params.name)">Buat Data {{router.currentRoute.value.params.name}}</ion-button>
        </ion-footer>
        <Footer/>
    </ion-page>
</template>


<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonButton, IonFooter, IonCardHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonCard, IonCardTitle, IonCardSubtitle } from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getExpenses, expensesData, expensesDataLength } from '@/data/accounting/Expenses'


const router = useRouter()
const loadDisabled = ref(false)

const addExpense = (expense) => {
    router.push({ name: 'AddExpense', params: { name: expense } })
}

const loadData = async (event) => {
    if (expensesData.length >= expensesDataLength.value) {
        loadDisabled.value = true
        event.target.complete()
        return
    }

    await getExpenses(router.currentRoute.value.params.name)
    event.target.complete()
}

onMounted(() => {
    getExpenses(router.currentRoute.value.params.name)
})
</script>