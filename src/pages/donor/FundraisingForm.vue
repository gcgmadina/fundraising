<template>
    <ion-page>
        <Header></Header>
        <ion-content class="ion-padding">
            <form id="fundraising-form" @submit.prevent="submit($event)">
                <ion-item>
                    <ion-input name="amount" v-model.number="jumlahUang" type="number" required label="Jumlah Donasi"
                        labelPlacement="floating" mode="md"></ion-input>
                </ion-item>
                <InputAmount @amount-selected="updateAmount" />

                <ion-item>
                    <ion-select name="mode_of_payment" required label="Metode Pembayaran" mode="md" v-model="paymentMethod">
                        <ion-select-option value="Wire Transfer">Transfer Bank</ion-select-option>
                    </ion-select>
                </ion-item>


                <h4 class="ml-4 mt-6">Dari Rekening:</h4>
                <ion-item>
                    <ion-input name="cheque_name" required label="Pemilik Rekening" labelPlacement="floating"
                        mode="md"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input name="cheque_no" required label="Nomor Rekening" labelPlacement="floating"
                        mode="md"></ion-input>
                </ion-item>
                <DatePicker label="Dikirim tanggal" v-model="receivedDate" />

            </form>
        </ion-content>
        <div class="w-full px-4 py-2">
            <ion-button form="fundraising-form" type="submit" expand="block">Submit</ion-button>
        </div>
        <Footer></Footer>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from "@ionic/vue"
import InputAmount from "@/components/InputAmount.vue";
import DatePicker from "@/components/DatePicker.vue";
import { journalEntry } from '@/data/donation/Fundraising';
import { toast } from 'frappe-ui';

const router = useRouter();
const user = inject('$user');

const jumlahUang = ref(0);
const paymentMethod = ref('Wire Transfer');
const receivedDate = ref(new Date().toISOString().split('T')[0]);

const updateAmount = (amount) => {
    jumlahUang.value = amount;
};

const submit = (e) => {
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.donor = user.data.email;
    data.fundraising = router.currentRoute.value.params.id;
    data.cheque_date = receivedDate.value;

    if (data.amount == 0) {
        toast({
            title: "Gagal",
            text: "Jumlah donasi tidak boleh 0",
            icon: "x-circle",
            position: "bottom-center",
            iconClasses: "text-red-500"
        })
    } else {
        journalEntry.create.submit(data).then(
            router.push({ name: 'DonorHome' })
        )

    }
};

</script>