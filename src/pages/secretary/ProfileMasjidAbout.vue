<template>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
        <ion-input name="title" label="Judul" label-placement="floating" fill="outline" mode="md"
            placeholder="Masukkan judul artikel" v-model="profile.title"></ion-input>
        <div class="flex flex-col w-full">
            <ion-label class="mb-2 ml-4">Deskripsi</ion-label>
            <div ref="editorContainer" class="quill-editor w-full min-h-[200px] border border-gray-300 rounded-lg">
            </div>
        </div>
        <ion-label class="ml-4">Gambar Masjid</ion-label>
        <div class="flex justify-between items-center">
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
                    <div v-if="profile.image" class="my-4">
                        <img :src="profile.image" alt="Preview Image" style="max-width: 200px; max-height: 200px;">
                    </div>
                </template>
            </FileUploader>
        </div>
        <ion-button type="submit" expand="block">Simpan Artikel</ion-button>
    </form>
</template>

<script setup>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ref, onMounted } from 'vue';
import { IonInput, IonLabel, IonButton } from '@ionic/vue';
import { FileUploader } from 'frappe-ui';
import { masjidProfile } from '@/data/masjid/MasjidProfile.js';

const editorContainer = ref(null);
let editor = null;
const profile = ref({});

onMounted(async () => {
    editor = new Quill(editorContainer.value, {
        theme: 'snow',
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

    profile.value = await masjidProfile.getProfile.fetch();

    if (profile.value.description) {
        editor.root.innerHTML = profile.value.description;
    }
});

const validateFileFunction = (fileObject) => { 
    if (fileObject.size > 2000000) {
        alert('File size should be less than 2MB');
        return false;
    }
    // console.log(fileObject);
    // return true;
}
const onSuccess = (file) => {
    // image.value = file.file_url;
    profile.value.image = file.file_url;
}

const submit = async (e) => {
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.description = editor.root.innerHTML;
    data.image = profile.value.image;

    masjidProfile.updateProfile.submit(data);
};
</script>