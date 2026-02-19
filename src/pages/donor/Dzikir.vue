<template>
    <BaseLayout>
        <template #content>
            <ion-segment mode="md" color="tertiary" v-model="currentSegment">
                <ion-segment-button value="pagi">
                    <ion-label class="normal-case font-bold">Pagi</ion-label>
                </ion-segment-button>
                <ion-segment-button value="petang">
                    <ion-label class="normal-case font-bold">Petang</ion-label>
                </ion-segment-button>
            </ion-segment>

            <div class="p-4">
                <div v-if="currentSegment == 'pagi'">
                    <DzikirPagi />
                </div>
                <div v-else-if="currentSegment == 'petang'">
                    <DzikirPetang />
                </div>
            </div>
        </template>
    </BaseLayout>
</template>

<script setup>
import { ref } from "vue";
import BaseLayout from "@/components/BaseLayout.vue";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/vue";
import DzikirPagi from "@/components/DzikirPagi.vue";
import DzikirPetang from "@/components/DzikirPetang.vue";

const currentSegment = ref("pagi");
</script>