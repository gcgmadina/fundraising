<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <form id="allocation-form" @submit.prevent="submit($event)">
                <ion-item>
                    <ion-input name="amount" v-model.number="jumlahUang" type="number" required label="Jumlah Alokasi"
                        labelPlacement="floating" mode="md"></ion-input>
                </ion-item>
                <InputAmount @amount-selected="updateAmount" />
    
                <ion-item>
                    <ion-select name="mode_of_payment" required label="Metode Pembayaran" mode="md" v-model="paymentMethod">
                        <ion-select-option value="Wire Transfer">Transfer Bank</ion-select-option>
                    </ion-select>
                </ion-item>
    
                <ion-item>
                    <ion-input name="note" required label="Catatan singkat" labelPlacement="floating" mode="md"></ion-input>
                </ion-item>
            </form>
        </template>
        <template #footer>
            <div class="w-full px-4 py-2">
                <ion-button form="allocation-form" type="submit" expand="block">Submit</ion-button>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { IonPage, IonContent, IonInput, IonItem, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import InputAmount from '@/components/InputAmount.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { journalEntry } from '@/data/donation/Fundraising'
import { toast } from 'frappe-ui';

const router = useRouter();
const jumlahUang = ref(0);
const paymentMethod = ref('Wire Transfer');

const submit = (e) => {
    event.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.amount = jumlahUang.value;
    data.fundraising = router.currentRoute.value.params.id;
    data.mode_of_payment = paymentMethod.value;

    if (data.amount == 0) {
        toast({
            title: "Gagal",
            text: "Jumlah dana alokasi tidak boleh 0",
            icon: "x-circle",
            position: "bottom-center",
            iconClasses: "text-red-500"
        })
    } else {
        journalEntry.allocation.submit({ data }).then(
            router.push({ name: 'FundraisingDetail', params: { id: router.currentRoute.value.params.id } })
        )

    }
};

const updateAmount = (amount) => {
    jumlahUang.value = amount;
};


</script>