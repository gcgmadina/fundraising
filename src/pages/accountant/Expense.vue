<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <h1 class="text-violet-900 font-bold my-8">Pengeluaran</h1>
            <ion-button expand="block" fill="outline" color="dark" mode="md" @click="openExpenseModal">
                <ion-icon :icon="chevronDown" slot="end"></ion-icon>
                <p class="normal-case">
                    Jenis Pengeluaran
                </p>
            </ion-button>
            <div class="border-2 mt-8 mb-6"></div>

            <!-- <div>{{ selectedExpensesType }}</div> -->
            <ExpenseList :expenseType="selectedExpensesType" />

            <ion-modal :is-open="expenseModal" :initial-breakpoint=".5" :breakpoints="[0, .25, .3, .5, 0.8, 1]"
                backdropDismiss="true" @didDismiss="closeExpenseModal">
                <ion-content>
                    <ion-list>
                        <ion-item v-for="(type, index) in expenseType" :key="index" @click="selectExpenseType(type)">
                            {{ type }}
                        </ion-item>
                    </ion-list>
                </ion-content>
            </ion-modal>

        </template>
        <template #footer>
            <div v-if="selectedExpensesType" class="p-2">
                <ion-button expand="block" color="primary" mode="md" @click="router.push({ name: 'AddExpense', params: { name: selectedExpensesType } })">
                    <ion-icon :icon="addCircle" slot="start" color="light"></ion-icon>
                    <p class="text-white normal-case">Tambah Pengeluaran {{ selectedExpensesType }}</p>
                </ion-button>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { IonButton, IonIcon, IonModal, IonItem, IonContent, IonList } from '@ionic/vue'
import { chevronDown, addCircle } from 'ionicons/icons';
import { ref } from 'vue'
import ExpenseList from './ExpenseList.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const expenseModal = ref(false)

const openExpenseModal = () => {
    expenseModal.value = true
}

const closeExpenseModal = () => {
    expenseModal.value = false
}

const expenseType = ["Pembayaran Listrik", "Pembayaran Air", "Honorarium Penceramah", "Biaya Kebersihan"]

const selectedExpensesType = ref("")
const selectExpenseType = (type) =>{
    selectedExpensesType.value = type
    closeExpenseModal()
}
</script>