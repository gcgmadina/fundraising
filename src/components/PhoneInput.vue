<template>
    <ion-item>
        <ion-input :v-model="props.vModel" label="No. Telp." placeholder="+62-xxx xxxx xxxx" v-maskito="phoneOptions"
            labelPlacement="floating"></ion-input>
    </ion-item>
</template>

<script setup>
import { IonInput, IonItem, IonList } from '@ionic/vue';
import { maskito as vMaskito } from '@maskito/vue';

const phoneOptions = {
    mask: ['+', '6', '2', '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    elementPredicate: (el) => {
        return new Promise((resolve) => {
            requestAnimationFrame(async () => {
                const input = await el.getInputElement();
                resolve(input);
            });
        });
    },
};

const props = defineProps({
    vModel: { type: String },
});
</script>