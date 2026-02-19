<template>
    <div class="relative bg-cover bg-center text-white p-6 mb-6 rounded-lg shadow-md overflow-hidden before:absolute before:inset-0 before:bg-black/20 before:rounded-lg before:z-0"
        :style="`background-image: url('${masjid}')`">

        <div class="relative z-10 mb-4">
            <h4 class="text-4xl font-bold">Assalamualaikum</h4>
            <p class="text-sm mb-1">{{ formatDate(today) }}</p>
            <p class="text-sm">{{ hijri }}</p>
        </div>

        <div class="relative z-10 text-center">
            <p>{{ nearestPrayerTime.name }}</p>
            <h1 class="font-bold mt-0">{{ nearestPrayerTime.time }}</h1>
        </div>
    </div>
</template>

<script setup>
import { formatDate, hijriDate } from "@/data/DateUtils.js";
import masjid from "@/components/icons/mosque_image.jpg";
import { onMounted, ref } from "vue"
import { getMosqueAddress, searchCity, fetchPrayerSchedule, getCurrentLocation, userPrayerSchedule } from "@/data/masjid/Address"

const today = new Date();
const hijri = ref("Memuat...")

const address = ref(null);
const userLocation = ref();
const schedule = ref();
const nearestPrayerTime = ref({});

async function fetchPrayerScheduleData() {
    try {
        // 1️⃣ Dapatkan alamat masjid
        const mosqueAddress = await getMosqueAddress();
        address.value = mosqueAddress;

        // 2️⃣ Dapatkan lokasi pengguna
        const userLocationData = await getCurrentLocation();
        userLocation.value = userLocationData;

        // 3️⃣ Dapatkan jadwal sholat berdasarkan lokasi pengguna
        schedule.value = await userPrayerSchedule(userLocationData.latitude, userLocationData.longitude);
    } catch (error) {
        console.error('Error getting user prayer schedule or current location:', error);

        // Jika gagal mendapatkan lokasi pengguna, coba cari berdasarkan kota dari alamat masjid
        if (address.value && address.value.city) {
            try {
                // 4️⃣ Cari ID kota berdasarkan nama kota
                const cityData = await searchCity(address.value.city);
                const cityId = cityData[0].id;

                // 5️⃣ Dapatkan jadwal sholat berdasarkan ID kota
                schedule.value = await fetchPrayerSchedule(cityId);
                nearestPrayerTime.value = getNearestPrayerTime(schedule.value);
            } catch (cityError) {
                console.error('Error fetching prayer schedule by city:', cityError);
            }
        } else {
            console.error('Error: Address city is not available.');
        }
    }
}

function getNearestPrayerTime(schedule) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const currentTime = currentHour * 60 + currentMinute;
    
    const prayerTimes = Object.entries(schedule).filter(([key, value]) => {
        return ["imsak", "subuh", "terbit", "dhuha", "dzuhur", "ashar", "maghrib", "isya"].includes(key);
    }).map(([key, value]) => {
        const [hour, minute] = value.split(":").map(Number);
        return { 
            name: key.charAt(0).toUpperCase() + key.slice(1), 
            time: hour * 60 + minute, 
            formatted: value 
        };
    });
    
    const nearestPrayer = prayerTimes.find(prayer => prayer.time > currentTime);
    
    return nearestPrayer ? { name: nearestPrayer.name, time: nearestPrayer.formatted } : {};
}

onMounted(async () => {
    hijri.value = await hijriDate(today); // Panggil fungsi dan simpan hasilnya

    fetchPrayerScheduleData();
});
</script>