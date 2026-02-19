<template>
    <BaseLayout>
        <template #content>
            <h1 class="font-bold text-violet-900 my-5">Jadwal Sholat</h1>
            <!-- <div class="max-w-sm mx-auto bg-white p-6"> -->
            <ion-list>
                <ion-item v-for="(prayer, index) in prayerTimes" :key="index">
                    <div class="flex justify-between items-center py-2 px-4 w-full">
                        <div class="flex items-center space-x-4">
                            <img :src="prayer.icon" class="w-8 h-8" alt="icon" />
                            <span class="text-violet-900 text-2xl">{{ prayer.name }}</span>
                        </div>
                        <span class="text-violet-900 font-semibold text-2xl mr-4">{{ prayer.time }}</span>
                    </div>
                </ion-item>

            </ion-list>
            <!-- </div> -->
        </template>
    </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/components/BaseLayout.vue';
import { prayerSchedule } from '@/data/masjid/Address';
import { onMounted, ref, computed, nextTick, watchEffect } from 'vue';
import Imsak from '@/components/icons/imsak.svg';
import Subuh from '@/components/icons/subuh.svg'
import Terbit from '@/components/icons/terbit.svg'
import Dhuha from '@/components/icons/dhuha.svg'
import Dzuhur from '@/components/icons/dzuhur.svg'
import Ashar from '@/components/icons/ashar.svg'
import Maghrib from '@/components/icons/maghrib.svg'
import Isya from '@/components/icons/isya.svg'
import { IonList, IonItem } from '@ionic/vue'

const schedule = ref(null);
const prayerTimes = ref([]);

watchEffect(() => {
    if (prayerSchedule.get) {
        schedule.value = prayerSchedule.get;

        // Perbarui prayerTimes setelah schedule tersedia
        if (schedule.value?.jadwal) {
            prayerTimes.value = [
                { name: 'Imsak', time: schedule.value.jadwal.imsak, icon: Imsak },
                { name: 'Subuh', time: schedule.value.jadwal.subuh, icon: Subuh },
                { name: 'Terbit', time: schedule.value.jadwal.terbit, icon: Terbit },
                { name: 'Dhuha', time: schedule.value.jadwal.dhuha, icon: Dhuha },
                { name: 'Dzuhur', time: schedule.value.jadwal.dzuhur, icon: Dzuhur },
                { name: 'Ashar', time: schedule.value.jadwal.ashar, icon: Ashar },
                { name: 'Maghrib', time: schedule.value.jadwal.maghrib, icon: Maghrib },
                { name: 'Isya', time: schedule.value.jadwal.isya, icon: Isya },
            ];
        }
    }
});

</script>