<template>
    <ion-page>
        <Header />
        <ion-content class="ion-padding">
            <form id="new-fundraising-form" class="flex flex-col space-y-4 w-full" @submit.prevent="submit">
                <ion-item>
                    <ion-input required name="subject" label="Judul" label-placement="floating" mode="md"></ion-input>
                </ion-item>

                <ion-item>
                    <div class="flex flex-row justify-between w-full">
                        <ion-label>Diadakan pada:</ion-label>
                        <ion-datetime-button datetime="datetime"></ion-datetime-button>
    
                        <ion-modal :keep-contents-mounted="true">
                            <ion-datetime id="datetime" v-model="time"></ion-datetime>
                        </ion-modal>
                    </div>
                </ion-item>

                <ion-item>
                    <ion-input name="speaker" label="Pembicara" label-placement="floating"
                        mode="md"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-input name="location" label="Lokasi" label-placement="floating"
                        mode="md"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label>Thumbnail</ion-label>
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

                <!-- Text Editor -->
                <ion-item class="flex flex-col items-start w-full">
                    <div class="flex flex-col w-full">
                        <ion-label class="mb-2">Deskripsi Kajian</ion-label>
                        <div ref="editorContainer"
                            class="quill-editor w-full min-h-[200px] border border-gray-300 rounded-lg"></div>
                    </div>
                </ion-item>

                <ion-button type="submit" expand="block" mode="ios">Simpan</ion-button>
            </form>
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { IonPage, IonContent, IonInput, IonItem, IonButton, IonLabel, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { discourse } from '@/data/masjid/Discourse'; 
import { FileUploader, toast } from 'frappe-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const image = ref(null);
const time = ref(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString());

const validateFileFunction = (fileObject) => { }
const onSuccess = (file) => {
    image.value = file.file_url;
}

const submit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.description = editor.root.innerHTML;
    data.thumbnail = image.value;
    data.time = time.value.replace('T', ' ').substring(0, 19);

    if ( data.thumbnail && data.time ) {
        discourse.create.submit(data)
            .then(() => {
                router.push({ name: 'DonorHome' });
            })

    } else {
        toast({
            title: "Gagal",
            text: "Thumbnail dan Waktu kajian harus diisi",
            icon: "x-circle",
            position: "bottom-center",
            iconClasses: "text-red-500"
        })
    }
};

const editorContainer = ref(null);
let editor = null;

onMounted(() => {
    editor = new Quill(editorContainer.value, {
        theme: 'snow', // Tema Quill, bisa juga 'bubble'
        modules: {
            toolbar: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                ['image', 'blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
            ]
        }
    });
});
</script>
