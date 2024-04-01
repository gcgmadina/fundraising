<template>
    <ion-card>
      <div class="flex justify-evenly my-2">
        <ion-button :fill="buttonFill(50000)" @click="changeAmount(50000)">50 ribu</ion-button>
        <ion-button :fill="buttonFill(100000)" @click="changeAmount(100000)">100 ribu</ion-button>
        <ion-button :fill="buttonFill(200000)" @click="changeAmount(200000)">200 ribu</ion-button>
      </div>
      <div class="flex justify-evenly my-2">
        <ion-button :fill="buttonFill(300000)" @click="changeAmount(300000)">300 ribu</ion-button>
        <ion-button :fill="buttonFill(500000)" @click="changeAmount(500000)">500 ribu</ion-button>
        <ion-button :fill="buttonFill(1000000)" @click="changeAmount(1000000)">1 juta</ion-button>
      </div>
    </ion-card>
  </template>
  
  <script setup>
  import { IonCard, IonButton } from '@ionic/vue';
  import { ref } from 'vue';
  
  const emit = defineEmits(['amount-selected']);
  const selectedAmount = ref(null);
  
  const changeAmount = (amount) => {
    selectedAmount.value = amount;
    // Emit event to parent component
    emit('amount-selected', selectedAmount.value);
  };
  
  // Function to determine the fill type based on the selected amount
  const buttonFill = (amount) => {
    return selectedAmount.value === amount ? 'solid' : 'outline';
  };
  </script>
  
  <style scoped>
  ion-button {
    width: 30%;
  }
  </style>
  