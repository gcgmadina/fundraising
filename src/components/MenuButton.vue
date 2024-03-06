<!-- components/MenuButton.vue -->
<template>
  <!-- <ion-button size="large" fill="clear" @click="navigate"> -->
  <ion-button :size="props.buttonsize" fill="clear" @click="navigate">
    <div class="custom-button">
      <ion-icon :icon="props.icon" size="large"></ion-icon>
      <div class="menuname">{{ props.label }}</div>
    </div>
  </ion-button>
</template>

<script setup>
import { IonButton, IonIcon } from '@ionic/vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  icon: { type: String, required: true },
  buttonsize: { type: String, default: 'large' },
  label: { type: String, required: true },
  route: { type: String, required: true },
});

const router = useRouter();

const navigate = () => {
  router.push(props.route);
};
</script>

<style scoped>
ion-button{
  margin: 3px;
}
.custom-button {
  width: min-content;
  margin: 3px;
  flex-direction: column;
  justify-content: center;
}

ion-icon {
  margin-bottom: 10px;
}
</style>
