<template>
    <ion-content class="ion-padding" @ionInfinite="loadData">
        <h1 class="text-center my-auto">{{ expenseType }}</h1>
        <ion-list>
            <ion-card v-for="(expense, index) in expensesData" :key="index" mode="md"
                class="flex justify-between items-center px-2 py-4">
                <ion-card-header>
                    <ion-card-title>Rp. {{ formatCurrency(expense.debit_in_account_currency) }}</ion-card-title>
                    <ion-card-subtitle>{{ expense.posting_date }}</ion-card-subtitle>
                </ion-card-header>
                <ion-button v-if="expense.docstatus == 1" @click="openCancelConfirmation(expense)" class="h-fit"
                    size="small" color="danger">
                    <ion-icon :icon="closeCircle" slot="start"></ion-icon>
                    <p class="normal-case">
                        Batalkan
                    </p>
                </ion-button>
                <ion-button v-if="expense.docstatus == 2" :disabled="true" size="small" color="medium">
                    <ion-icon :icon="ban" slot="start"></ion-icon>
                    <p class="normal-case">
                        Dibatalkan
                    </p>
                </ion-button>
            </ion-card>
        </ion-list>
        <ion-infinite-scroll threshold="100px" @ionInfinite="loadData" :disabled="loadDisabled.value">
            <ion-infinite-scroll-content loadingSpinner="bubbles"
                loadingText="Loading more data..."></ion-infinite-scroll-content>
        </ion-infinite-scroll>

        <!-- Cancel Confirmation Modal -->
        <ion-modal :is-open="isCancelModalOpen" @did-dismiss="closeCancelConfirmation">
            <ion-content class="ion-padding">
                <h2>Konfirmasi Pembatalan</h2>
                <p>Apakah Anda yakin ingin membatalkan transaksi ini?</p>
                <ion-button expand="block" @click="confirmCancel">Ya, Batalkan</ion-button>
                <ion-button expand="block" color="light" @click="closeCancelConfirmation">Tidak, Kembali</ion-button>
            </ion-content>
        </ion-modal>
    </ion-content>
</template>

<script setup>
import { IonIcon, IonContent, IonButton, IonCardHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonCard, IonCardTitle, IonCardSubtitle, IonModal } from '@ionic/vue'
import { closeCircle, ban } from 'ionicons/icons';
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { expensesResource, expensesData, expensesDataLength, cancelExpense } from '@/data/accounting/Expenses'

const props = defineProps({
    expenseType: String // Menerima jenis pengeluaran dari Expense.vue
})

const router = useRouter()
const loadDisabled = ref(false)
const isCancelModalOpen = ref(false)
const expenseToCancel = ref(null)

const loadData = async (event) => {
    if (expensesData.length >= expensesDataLength.value) {
        loadDisabled.value = true
        event.target.complete()
        return
    }

    await expensesResource(props.expenseType)
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
        await cancelExpense(expenseToCancel.value.parent)
        closeCancelConfirmation()
        window.location.reload()
    }
}

// Pastikan expensesData dikosongkan sebelum memuat data baru
watch(() => props.expenseType, async (newType) => {
    if (newType) {
        expensesData.length = 0 // Reset list sebelum mengambil data baru
        await expensesResource(newType)
    }
})

onMounted(() => {
    if (props.expenseType) {
        expensesData.length = 0 // Pastikan kosong saat pertama kali dipasang
        expensesResource(props.expenseType)
    }
})

const formatCurrency = (value) => {
    return value.toLocaleString('id-ID');
}
</script>
