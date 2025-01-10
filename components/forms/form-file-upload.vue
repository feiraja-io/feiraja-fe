<template>
    <div>
        <button @click="selectImage" type="button">Select Image from Gallery</button>
        <div v-if="image">
            <img :src="image" alt="Selected Image" />
        </div>
    </div>
</template>

<script>
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default {
    name: 'FormFileUpload',
    data() {
        return {
            image: null,
        };
    },
    methods: {
        async selectImage() {
            try {
                const image = await Camera.getPhoto({
                    resultType: CameraResultType.DataUrl,
                    source: CameraSource.Photos,
                    quality: 100,
                });
                this.image = image.dataUrl;
            } catch (error) {
                console.error('Error selecting image:', error);
            }
        },
    },
};
</script>

<style scoped>
button {
    margin-bottom: 10px;
}

img {
    max-width: 100%;
    height: auto;
}
</style>