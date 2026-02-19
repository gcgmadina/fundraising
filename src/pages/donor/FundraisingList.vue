<template>
    <BaseLayout :showHeroSection="false">
        <template #content>
            <h1 class="text-violet-900 font-bold">Daftar Penggalangan Dana</h1>
            <div class="sticky top-0 bg-white z-10 py-2">
                <ion-segment class="my-2" value="on-going" mode="md" color="tertiary" v-model="currentSegment">
                    <ion-segment-button value="on-going">
                        <ion-label>Berlangsung</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="ended">
                        <ion-label>Selesai</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </div>
    
            <onGoingFundraising v-if="currentSegment == 'on-going'"></onGoingFundraising>
            <endedFundraising v-else-if="currentSegment == 'ended'"></endedFundraising>
        </template>
    </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue"
import { fundraising } from '@/data/donation/Fundraising';
import { useRouter } from 'vue-router';
import onGoingFundraising from '@/components/FundraisingOnGoing.vue';
import endedFundraising from '@/components/FundraisingEnded.vue';
import BaseLayout from '@/components/BaseLayout.vue';

const router = useRouter();
const currentSegment = ref('on-going');

onMounted(() => {
    fundraising.getList.fetch()
})
</script>