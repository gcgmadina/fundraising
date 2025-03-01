<template>
    <ion-page>
        <Header />
        <ion-content class="ion-padding">
            <form id="new-fundraising-form" class="flex flex-col space-y-4 w-full" @submit.prevent="submit">
                <ion-item>
                    <ion-input required name="title" label="Nama" label-placement="floating"
                        placeholder="Penggalangan Dana" mode="md"></ion-input>
                </ion-item>

                <ion-item class="flex flex-row items-start w-full">
                    <ion-input required name="code" label="Kode Unik" label-placement="floating"
                        placeholder="Kode Penggalangan Dana" mode="md" class="w-full"></ion-input>
                        <!-- <p class="text-xs">*Kode ini digunakan untuk pengecekan riwayat transaksi pada akun bank</p> -->
                </ion-item>

                <!-- Picker untuk Mulai -->
                <DatePicker label="Mulai" v-model="startDate" />

                <!-- Picker untuk Berakhir -->
                <DatePicker label="Berakhir" v-model="endDate" />

                <ion-item>
                    <ion-input required name="goal" label="Target" label-placement="floating" placeholder="Rp 1.000.000"
                        type="number" mode="md"></ion-input>
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
                        <ion-label class="mb-2">Isi Berita</ion-label>
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
import { IonPage, IonContent, IonInput, IonItem, IonButton, IonLabel } from '@ionic/vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/donor/Footer.vue';
import DatePicker from '@/components/DatePicker.vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { fundraising } from '@/data/donation/Fundraising';
import { FileUploader, toast } from 'frappe-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const image = ref(null);

const validateFileFunction = (fileObject) => { }
const onSuccess = (file) => {
    image.value = file.file_url;
}

const startDate = ref(new Date().toISOString().split('T')[0]);
const endDate = ref(new Date().toISOString().split('T')[0]);

const submit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.starts_on = startDate.value;
    data.ends_on = endDate.value;
    data.content = editor.root.innerHTML; // Menyimpan isi editor ke dalam data
    data.thumbnail = image.value;

    // console.log(data);
    if (data.title && data.starts_on && data.ends_on && data.goal && data.content && data.thumbnail) {
        // submitData(data);
        fundraising.newFundraising.submit(data);
        router.push({ name: 'DonorHome' });
    } else {
        toast({
            title: "Gagal",
            text: response.message,
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
