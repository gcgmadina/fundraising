<template>
  <ion-app>
    <!-- <ion-router-outlet id="main-content" /> -->
    <router-view />
    <Toasts />
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { Toasts } from "frappe-ui"
</script>