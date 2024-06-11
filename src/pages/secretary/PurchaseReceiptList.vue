<template>
    <ion-page>
        <Header :showBackButton="true"/>
        <ion-content>
            <h1 class="text-center my-4">Riwayat Pembelian Barang</h1>
            <ion-list>
                <ion-card v-for="pr in purchaseReceiptScrollData" :key="pr.name" @click="purchaseReceiptDetail(pr.name)">
                    <ion-card-header class="flex flex-row">
                        <div class="flex flex-auto flex-col mx-4">
                            <ion-card-title>{{ pr.posting_date }}</ion-card-title>
                            <ion-card-subtitle>{{ pr.total }}</ion-card-subtitle>
                        </div>
                        <ion-button :color="getStatus(pr.status)">
                            {{ pr.status }}
                        </ion-button>
                    </ion-card-header>
                </ion-card>
            </ion-list>
            <ion-infinite-scroll :disabled="loadDisabled" @ionInfinite="loadData($event)">
                <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data...">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </ion-content>
        <ion-button @click="addPurchaseReceipt" color="primary">
            Tambah Daftar Pembelian
        </ion-button>
        <Footer/>
    </ion-page>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonContent, IonPage, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue'
import { useRouter } from 'vue-router'
import { getPurchaseReceiptScroll, purchaseReceiptScrollData, purchaseReceiptDataLength } from '@/data/secretary/PurchaseReceipt'
import { ref, onMounted, onUnmounted } from 'vue'

const router = useRouter()
const loadDisabled = ref(false);

const purchaseReceiptDetail = (name) => {
    router.push({ name: 'PurchaseReceipt', params: { id: name } })
}

const getStatus = (status) => {
    if (status === "Disetujui") {
        return "success";
    } else if (status === "Dibatalkan") {
        return "danger";
    } else if (status === "Diajukan") {
        return "primary";
    } else {
        return "warning";
    }
}

const loadData = (event) => {
    setTimeout(() => {
        if ( purchaseReceiptScrollData.length >= purchaseReceiptDataLength.value ) {
            loadDisabled.value = true;
            event.target.complete();
        }
        else {
            getPurchaseReceiptScroll();
            loadDisabled.value = false;
            event.target.complete();
        }
    }, 500);
}

onMounted(() => {
    getPurchaseReceiptScroll();
});

const addPurchaseReceipt = () => {
    router.push({ name: 'addPurchaseReceipt' })
}
</script>