<template>
    <ion-page>
        <Header />
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-input v-model="subject" label="Nama Kegiatan" label-placement="floating"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-select v-model="eventCategory" label="Kategori">
                        <ion-select-option value="Event">Kegiatan</ion-select-option>
                        <ion-select-option value="Donation">Penggalangan Dana</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-select v-model="eventType" label="Tipe">
                        <ion-select-option value="Private">Tertutup</ion-select-option>
                        <ion-select-option value="Public">Publik</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label>Mulai</ion-label>
                    <ion-datetime-button datetime="startsOn"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime v-model="startsOn" id="startsOn"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <ion-item>
                    <ion-label>Selesai</ion-label>
                    <ion-datetime-button datetime="endsOn"></ion-datetime-button>

                    <ion-modal :keep-contents-mounted="true">
                        <ion-datetime v-model="endsOn" id="endsOn"></ion-datetime>
                    </ion-modal>
                </ion-item>
                <ion-item>
                    <FileUploader :fileTypes="['image/*']" :validateFile="validateFileFunction" @success="onSuccess">
                        <template v-slot="{
                        file,
                        uploading,
                        progress,
                        uploaded,
                        message,
                        error,
                        total,
                        success,
                        openFileSelector,
                    }" class="flex flex-row justify-between">
                            <Button @click="openFileSelector" :loading="uploading">
                                {{ uploading ? `Uploading ${progress}%` : 'Upload Image' }}
                            </Button>
                            <div v-if="uploaded" class="my-4">
                                <img :src="image" alt="Preview Image" style="max-width: 200px; max-height: 200px;">
                            </div>
                        </template>
                    </FileUploader>
                </ion-item>
                <ion-item>
                    <ion-select v-model="status" label="Status">
                        <ion-select-option value="Open">Akan Dilaksanakan</ion-select-option>
                        <ion-select-option value="Completed">Selesai</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
            <ion-button @click="submitForm" :disabled="!isValidForm">Kirim</ion-button>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { IonPage, IonContent, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonDatetime, IonDatetimeButton, IonModal, IonLabel, IonButton } from '@ionic/vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/donor/Footer.vue'
import { formatDateTime } from "@/data/DateUtils";
import { createResource, fileToBase64, FileUploader, Button } from "frappe-ui"
import moment from 'moment'

const subject = ref('')
const eventCategory = ref('')
const eventType = ref('')
const today = new Date()
const startsOn = ref(moment(today).format('YYYY-MM-DDTHH:mm'))
// const startsOn = ref()
const endsOn = ref()
const status = ref('')
const image = ref()
let base64;
let start;
let end;

const validateFileFunction = (fileObject) => { }
const onSuccess = (file) => {
    console.log(file);
    image.value = file.file_url;
    console.log(image.value);
}

const isValidForm = computed(() => {
    return subject.value && eventCategory.value && eventType.value && startsOn.value;
})

const submitForm = () => {
    if (isValidForm.value) {
        console.log('startsOn ', startsOn.value)
        console.log('image ', image.value)  
        // let postEvent = createResource({
        //     method: 'POST',
        //     url: 'non_profit.api.fundraising.new_event',
        //     params: {
        //         subject: subject.value,
        //         event_category: eventCategory.value,
        //         event_type: eventType.value,
        //         starts_on: startsOn.value,
        //         ends_on: endsOn.value,
        //         status: status.value,
        //         thumbnail: image.value,
        //     },
        //     onSuccess: (response) => {
        //         console.log(response);
        //     },
        //     onError: (error) => {
        //         console.log(error);
        //     }
        // })
        // postEvent.reload();
    } else {
        console.log('Form is not valid. Please fill in all required fields.');
    }
};
</script>