<template>
    <ion-page>
        <Header />
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-input v-model="news.title" required type="text" label="Judul Berita"
                        labelPlacement="floating"></ion-input>
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
                            <Button @click="openFileSelector" :loading="uploading" class="">
                                {{ uploading ? `Uploading ${progress}%` : 'Upload Image' }}
                            </Button>
                        </template>
                    </FileUploader>
                </ion-item>
                <div v-if="fileSizeLimit" class="text-red-600 text-right ion-padding">*Ukuran gambar tidak boleh lebih dari 1MB</div>
                <div v-if="news.thumbnail" class="flex justify-between mx-16 m-8">
                    <img :src="news.thumbnail" alt="Preview Image" class="max-w-xs max-h-xs">
                </div>

                <ion-item>
                    <div class="flex flex-col">
                        <div class="my-2">
                            <ion-label >Isi Berita</ion-label>

                        </div>
                        <div class="w-full">
                            <div ref="editorContainer" class="quill-editor"></div>
                        </div>

                    </div>
                </ion-item>

            </ion-list>
            <div class="flex justify-end">
                <ion-button @click="submitForm">Simpan</ion-button>
            </div>

            <SuccessModal :isModalOpen="isModalOpen" :validationSuccess="validationSuccess" :closeModal="closeModal"
                :successMessage="successMessage" :failureMessage="failureMessage" />
        </ion-content>
        <Footer />
    </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import { FileUploader, Button } from 'frappe-ui';
import SuccessModal from '@/components/SuccessModal.vue';
import { createNews, updateNews, fetchNews } from '@/data/masjid/News';
import { IonPage, IonContent, IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const router = useRouter();
const news = ref({
    title: '',
    content: '',
    image: '',
});

const isModalOpen = ref(false);
const validationSuccess = ref(false);
const successMessage = ref('');
const failureMessage = ref('');
const fileSizeLimit = ref(false);

const validateFileFunction = (file) => {
    if (file.size > 1000000) {
        fileSizeLimit.value = true;

        return 'File size should be less than 1MB';
    }
    fileSizeLimit.value = false;
};

const onSuccess = (file) => {
    news.value.thumbnail = file.file_url;
};

const submitForm = () => {
    news.value.content = editor.root.innerHTML;

    if (router.currentRoute.value.params.id) {
        updateNews(news.value)
            .then(() => {
                validationSuccess.value = true;
                successMessage.value = 'Berita berhasil diubah';
                isModalOpen.value = true;
            })
            .catch(() => {
                validationSuccess.value = false;
                failureMessage.value = 'Gagal mengubah berita';
                isModalOpen.value = true;
            });
    } else {
        createNews(news.value)
            .then(() => {
                validationSuccess.value = true;
                successMessage.value = 'Berita berhasil ditambahkan';
                isModalOpen.value = true;
            })
            .catch(() => {
                validationSuccess.value = false;
                failureMessage.value = 'Gagal menambahkan berita';
                isModalOpen.value = true;
            });
    }
};

const closeModal = () => {
    isModalOpen.value = false;
    if (validationSuccess.value) {
        router.back();
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

    fetchNews(router.currentRoute.value.params.id).then((data) => {
        news.value = data;
        editor.root.innerHTML = news.value.content;
    });
});
</script>

<style>
.quill-editor {
    min-height: 300px;
    /* Tinggi minimal untuk editor */
}

.ql-toolbar {
    margin-bottom: 10px;
    /* Spasi antara toolbar dan editor */
}
</style>