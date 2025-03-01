<template>
    <ion-page>
        <Header  :showBackButton="true"></Header>
        <ion-content class="ion-padding">
            <form id="fundraising-form" @submit.prevent="submit($event)">
                <ion-item>
                    <ion-input name="amount" v-model.number="jumlahUang" type="number" required label="Jumlah Donasi"
                        labelPlacement="floating" mode="md"></ion-input>
                </ion-item>
                <InputAmount @amount-selected="updateAmount" />

                <ion-item>
                    <ion-select name="mode_of_payment" required label="Metode Pembayaran" mode="md"
                        v-model="paymentMethod">
                        <ion-select-option value="Wire Transfer">Transfer Bank</ion-select-option>
                        <ion-select-option v-if="qrImageUrl" value="QRIS">QRIS</ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item v-if="paymentMethod === 'Wire Transfer'">
                    <ion-select name="bank" label="Pilih Bank" v-model="bank" mode="md">
                        <ion-select-option v-for="account in bankAccountList" :key="account.id" :value="account.name">
                            {{ account.bank }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <h4 class="ml-4 mt-6">Cara pembayaran:</h4>
                <div v-if="paymentMethod == 'Wire Transfer' && bank" class="flex flex-col gap-y-2">
                    <p class="ml-4">Transfer ke rekening {{ selectedBankAccountNo || '-' }}</p>
                    <p class="ml-4">Tolong Sertakan kode {{ fundraisingDetail.code }}</p>
                </div>
                <div v-else-if="paymentMethod == 'QRIS'" class="flex flex-col gap-y-2">
                    <p class="ml-4">TScan QR di bawah</p>
                    <img :src="qrImageUrl" alt="QR code" class="w-1/2 mx-auto">
                </div>

                <!-- <h4 class="ml-4 mt-6">Dari Rekening:</h4>
                <ion-item>
                    <ion-input name="cheque_name" required label="Pemilik Rekening" labelPlacement="floating"
                        mode="md"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input name="cheque_no" required label="Nomor Rekening" labelPlacement="floating"
                        mode="md"></ion-input>
                </ion-item>
                <DatePicker label="Dikirim tanggal" v-model="receivedDate" /> -->

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
import { ref, inject, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from "@ionic/vue"
import InputAmount from "@/components/InputAmount.vue";
import DatePicker from "@/components/DatePicker.vue";
import { journalEntry } from '@/data/donation/Fundraising';
import { toast } from 'frappe-ui';
import { bankAccountList } from "@/data/accounting/BankList";
import { fundraising } from '@/data/donation/Fundraising';
import { get_donation_qr } from "@/data/accounting/DonationQR";

const router = useRouter();
const user = inject('$user');

const jumlahUang = ref(0);
const paymentMethod = ref('Wire Transfer');
const bank = ref();
// const receivedDate = ref(new Date().toISOString().split('T')[0]);

const updateAmount = (amount) => {
    jumlahUang.value = amount;
};

// Computed property untuk mendapatkan nomor rekening berdasarkan bank yang dipilih
const selectedBankAccountNo = computed(() => {
    const selectedBank = bankAccountList.find(account => account.name === bank.value);
    return selectedBank ? selectedBank.bank_account_no : null;
});

const submit = (e) => {
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.donor = user.data.email;
    data.fundraising = router.currentRoute.value.params.id;
    // data.cheque_date = receivedDate.value;

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

const fundraisingDetail = ref({});
const qrImageUrl = ref();

onMounted(async () => {
    fundraising.detail.fetch({
        fundraising: router.currentRoute.value.params.id
    }).then((response) => {
        fundraisingDetail.value = response;
    })

    get_donation_qr()
    .then((qrImage) => {
      qrImageUrl.value = qrImage;  // Set the URL or base64 image data
    })
    .catch((error) => {
      console.error("Error fetching QR image:", error);
    });
});

</script>
