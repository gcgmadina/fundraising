<template>
    <ion-page>
        <Header />
        <ion-content>
            <div class="max-w-3xl py-12 mx-auto">
                <h2 class="font-bold text-lg text-gray-600 mb-4">
                    Welcome {{ session.user }}!
                </h2>
        
                <Button icon-left="code" @click="ping.fetch" :loading="ping.loading">
                    Click to send 'ping' request
                </Button>
                <div>
                    {{ ping.data }}
                </div>
                <pre>{{ ping }}</pre>
        
                <div class="flex flex-row space-x-2 mt-4">
                    <Button @click="showDialog = true">Open Dialog</Button>
                    <Button v-if="session.isLoggedIn" @click="session.logout.submit()">Logout</Button>
                    <Button v-else @click="router.push({path: '/account/login'})">Login</Button>
                </div>
        
                <!-- Dialog -->
                <Dialog title="Title" v-model="showDialog"> Dialog content </Dialog>
            </div>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'frappe-ui'
import { createResource } from 'frappe-ui'
import { session } from '../data/session'
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'

const router = useRouter()

const ping = createResource({
    url: 'ping',
    auto: true,
})

// console.log(session.user)

const showDialog = ref(false)
</script>