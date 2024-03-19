<template>
    <ion-input :value="modelValue" @ionChange="onInputChange($event.target.value)" label="No. Telp." placeholder="+62-xxx xxxx xxxx" 
    v-maskito="phoneOptions" labelPlacement="floating"></ion-input>
</template>

<script setup>
import { IonInput, IonItem, IonList } from '@ionic/vue';
import { maskito as vMaskito } from '@maskito/vue';
import { defineProps, defineEmits } from 'vue';

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
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const onInputChange = (value) => {
  emit('update:modelValue', value);
};
</script>