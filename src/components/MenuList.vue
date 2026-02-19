<template>
    <div class="border-2 p-4 rounded-lg bg-white">
        <div class="flex flex-row flex-wrap justify-around gap-4 text-center">
            <div v-for="menu in menus" :key="menu.title" @click="navigate(menu.link)"
                class="flex flex-col items-center cursor-pointer transition-transform hover:scale-110 w-20">
                <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <img :src="menu.icon" alt="" class="w-8 h-8" />
                </div>
                <p class="text-sm mt-2 break-words whitespace-normal max-w-[70px]">
                    {{ menu.title }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { useRouter } from "vue-router";
import Solat from "@/components/icons/solat.svg";
import Tasbih from "@/components/icons/tasbih.svg";
import Quran from "@/components/icons/quran.svg";
import Berita from "@/components/icons/berita.svg"
import Kajian from "@/components/icons/kajian.svg"
import PenggalanganDana from "@/components/icons/penggalangan_dana.svg"
import ProfilMasjid from "@/components/icons/profil_masjid.svg"
import LaporanKeuangan from "@/components/icons/laporan_keuangan.svg"
import Pengeluaran from "@/components/icons/pengeluaran.svg"
import RekeningBank from "@/components/icons/rekening_bank.svg"
import qrDonasi from "@/components/icons/qr_donasi.svg"

const router = useRouter();
const user = inject('$user');
const session = inject('$session');

const guestMenus = ref([
    { title: "Jadwal Solat", icon: Solat, link: "PrayerTimes" },
    { title: "Dzikir", icon: Tasbih, link: "Dzikir" },
    { title: "Al-quran", icon: Quran, link: "SurahList" }
]);

const secretaryMenus = ref([
    { title: "Profil Masjid", icon: ProfilMasjid, link: "MasjidProfile" },
    { title: "Berita", icon: Berita, link: "SecretaryNewsList" },
    { title: "Kajian", icon: Kajian, link: "SecretaryDiscourseList" },
    { title: "Penggalangan Dana", icon: PenggalanganDana, link: "SecretaryFundraisingList" }
])

const accountantMenus = ref([
    { title: "Laporan Keuangan", icon: LaporanKeuangan, link: "FinancialReport" },
    { title: "Pengeluaran", icon: Pengeluaran, link: "Expenses" },
    { title: "Rekening Bank", icon: RekeningBank, link: "BankAccount" },
    { title: "QR Donasi", icon: qrDonasi, link: "QRCode" }
])

const menus = computed(() => {
    const roles = user?.data?.roles || [];

    let combinedMenus = [...guestMenus.value];

    if (roles.includes('Non Profit Secretary')) {
        combinedMenus = [ ...secretaryMenus.value, ...combinedMenus];
    }

    if (roles.includes('Non Profit Accounting')) {
        combinedMenus = [...accountantMenus.value, ...combinedMenus];
    }

    return combinedMenus;
});


const navigate = (route) => {
    router.push({ name: route });
};
</script>
