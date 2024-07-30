<template>
    <ion-page>
        <Header :showBackButton="true" />
        <ion-content class="ion-padding" @ionInfinite="loadData">
            <h1 class="text-center my-auto">{{ router.currentRoute.value.params.name }}</h1>
            <ion-list>
                <ion-card v-for="(expense, index) in expensesData" :key="index"
                    class="flex justify-between items-center px-2 py-4">
                    <ion-card-header>
                        <ion-card-title>Rp. {{ formatCurrency (expense.debit_in_account_currency) }}</ion-card-title>
                        <ion-card-subtitle>{{ expense.posting_date }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-button v-if="expense.docstatus == 1" @click="openCancelConfirmation(expense)" shape="round"
                        class="h-fit" size="small" color="danger">Batalkan</ion-button>
                    <ion-button v-if="expense.docstatus == 2" :disabled="true" shape="round" size="small"
                        color="medium">Dibatalkan</ion-button>
                </ion-card>
            </ion-list>
            <ion-infinite-scroll threshold="100px" @ionInfinite="loadData" :disabled="loadDisabled.value">
                <ion-infinite-scroll-content loadingSpinner="bubbles"
                    loadingText="Loading more data..."></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
            <ion-button expand="block" @click="addExpense(router.currentRoute.value.params.name)">Buat Data {{
            router.currentRoute.value.params.name }}</ion-button>
        <Footer />

        <!-- Cancel Confirmation Modal -->
        <ion-modal :is-open="isCancelModalOpen" @did-dismiss="closeCancelConfirmation">
            <ion-content class="ion-padding">
                <h2>Konfirmasi Pembatalan</h2>
                <p>Apakah Anda yakin ingin membatalkan transaksi ini?</p>
                <ion-button expand="block" @click="confirmCancel">Ya, Batalkan</ion-button>
                <ion-button expand="block" color="light" @click="closeCancelConfirmation">Tidak, Kembali</ion-button>
            </ion-content>
        </ion-modal>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonButton, IonFooter, IonCardHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonCard, IonCardTitle, IonCardSubtitle, IonModal } from '@ionic/vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { expensesResource, expensesData, expensesDataLength, cancelExpense } from '@/data/accounting/Expenses'

const router = useRouter()
const loadDisabled = ref(false)
const isCancelModalOpen = ref(false)
const expenseToCancel = ref(null)

const addExpense = (expense) => {
    router.push({ name: 'AddExpense', params: { name: expense } })
}

const loadData = async (event) => {
    if (expensesData.length >= expensesDataLength.value) {
        loadDisabled.value = true
        event.target.complete()
        return
    }

    await expensesResource(router.currentRoute.value.params.name)
    event.target.complete()
}

const openCancelConfirmation = (expense) => {
    expenseToCancel.value = expense
    isCancelModalOpen.value = true
}

const closeCancelConfirmation = () => {
    isCancelModalOpen.value = false
    expenseToCancel.value = null
}

const confirmCancel = async () => {
    if (expenseToCancel.value) {
        console.log(expenseToCancel.value)
        await cancelExpense(expenseToCancel.value.parent)
        closeCancelConfirmation()
        window.location.reload()
    }
}

onMounted(() => {
    expensesResource(router.currentRoute.value.params.name)
})

onUnmounted(() => {
    window.location.reload()
})

const formatCurrency = (value) => {
    return value.toLocaleString('id-ID');
}
</script>