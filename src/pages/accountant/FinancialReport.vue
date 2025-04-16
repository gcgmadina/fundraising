<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <div class="sticky bg-white top-0 z-10">
                <h1 class="text-violet-900 font-bold my-8">Laporan Keuangan</h1>
                <h4 class="text-violet-900 font-bold my-8">Rentang Tanggal:</h4>
                <div class="flex justify-center items-center gap-4 w-full">
                    <DatePicker class="flex justify-end" v-model="fromDate" />
                    <span class="text-2xl"> - </span>
                    <DatePicker v-model="toDate" />
                </div>
                <div class="border-2 my-6"></div>
            </div>
            <ion-list>
                <ion-card v-for="(report, index) in list" mode="md">
                    <div class="flex justify-between p-4 w-full">
                        <p class="text-black text-sm leading-snug line-clamp-2 break-words w-[30%]">{{ report.title }}
                        </p>
                        <p>{{ report.posting_date }}</p>
                        <p v-if="report.type == 'in'" class="text-green-800 font-bold w-[30%]">
                            Rp. {{ report.total_debit }}
                        </p>
                        <p v-else class="text-red-800 font-bold w-[30%]">
                            Rp. {{ report.total_credit }}
                        </p>
                    </div>
                </ion-card>
            </ion-list>
            <ion-infinite-scroll
                ref="infiniteScrollRef"
                threshold="100px"
                @ionInfinite="loadData"
                :disabled="loadDisabled.value"
            >
                <ion-infinite-scroll-content loadingSpinner="bubbles"
                    loadingText="Loading more data..."></ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import DatePicker from '@/components/DatePicker.vue';
import { ref, onMounted, watch } from 'vue';
import { IonCard, IonInfiniteScroll, IonInfiniteScrollContent, IonList } from '@ionic/vue/';
import { createResource } from 'frappe-ui';

const today = new Date();
today.setMonth(today.getMonth(), 1);
const fromDate = ref(today.toISOString().split('T')[0]);
const toDate = ref(new Date().toISOString().split('T')[0]);
const list = ref([]);
const loadDisabled = ref(false);
const infiniteScrollRef = ref(null);

const reports = createResource({
    url: "non_profit.api.report.daily_report_journal_entry",
    auto: false,
    makeParams(data) {
        return data
    },
    transform(response) {
        list.value.push(...response.data);
    },
    onSuccess(response) {
        loadDisabled.value = response.data.length < 10;
    },
});

onMounted(() => {
    reports.fetch({
        fromDate: fromDate.value,
        toDate: toDate.value,
        start: 0,
        length: 10
    })
});

watch([fromDate, toDate], () => {
    list.value = [];
    start.value = 0;
    loadDisabled.value = false;

    // Gunakan native DOM untuk enable infinite scroll
    if (infiniteScrollRef.value?.$el) {
        infiniteScrollRef.value.$el.disabled = false;
    }

    reports.fetch({
        fromDate: fromDate.value,
        toDate: toDate.value,
        start: 0,
        length: 10
    });
});

const start = ref(10);
const loadData = async (event) => {
    await reports.fetch({
        fromDate: fromDate.value,
        toDate: toDate.value,
        start: start.value,
        length: 10
    });

    start.value += 10;

    // Tunggu hingga selesai dan akhiri loading
    event.target.complete();

    // Matikan infinite scroll jika tidak ada data tambahan
    if (loadDisabled.value) {
        event.target.disabled = true;
    }
};

</script>