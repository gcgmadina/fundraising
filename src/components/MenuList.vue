<template>
    <div class="border-2 p-4 rounded-lg bg-white">
        <div class="flex flex-row flex-wrap justify-center gap-4 text-center">
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import Solat from "@/components/icons/solat.svg";
import Tasbih from "@/components/icons/tasbih.svg";
import Quran from "@/components/icons/quran.svg";

const router = useRouter();

const menus = ref([
    { title: "Jadwal Solat", icon: Solat, link: "PrayerTimes" },
    { title: "Dzikir", icon: Tasbih, link: "Dzikir" },
    { title: "Al-quran", icon: Quran, link: "SurahList" }
]);

const navigate = (route) => {
    router.push({ name: route });
};
</script>
