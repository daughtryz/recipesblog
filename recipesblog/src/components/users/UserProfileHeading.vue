<template>
    <div class='section profile-heading'>
        <div class='columns is-mobile is-multiline'>
            <div class='column is-2'>
                <span class='header-icon user-profile-image'>
                    <img v-if="!userStore.user.photoURL" alt='' src='http://placehold.it/300x225'>
                    <img v-else alt='' :src='userStore.user.photoURL'>
                </span>
            </div>
            <div class='column is-4-tablet is-10-mobile name'>
                <p>
                    <span class='title is-bold'>{{ userStore.user.email }}</span>
                    <br>
                <div v-if="!selectedFile" class="file is-primary mt-2">
                    <label class="file-label">
                        <input @change="onFileChange" class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">Change profile picture</span>
                        </span>
                    </label>
                </div>
                <!-- Modal -->
                <div v-else class="modal is-active">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <p class="image is-4by3">
                            <img :src="previewUrl" alt="User profile picture">
                        </p>
                    </div>
                    <button class="modal-close is-large" @click="selectedFile = null" aria-label="close"></button>
                    <div class="buttons mt-2">
                        <button class="button is-success" @click="uploadToCloudinary">Upload picture</button>
                        <button class="button" @click="selectedFile = null">Cancel</button>
                    </div>
                </div>
                <br>
                </p>
            </div>
            <div class='column is-2-tablet is-4-mobile has-text-centered'>
                <p class='stat-val'>{{ myRecipesCount }}</p>
                <p class='stat-key'>recipes</p>
            </div>
            <div class='column is-2-tablet is-4-mobile has-text-centered'>
                <p class='stat-val'>{{ myLikedRecipes }}</p>
                <p class='stat-key'>likes</p>
            </div>
            <div class='column is-2-tablet is-4-mobile has-text-centered'>
                <p class='stat-val'>{{ myComments }}</p>
                <p class='stat-key'>comments</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/storeAuth';
import { useRecipeStore } from '@/stores/storeRecipe';
import { getAuth, updateProfile } from 'firebase/auth';

export default {
    setup() {
        const userStore = useUserStore();
        const recipeStore = useRecipeStore();

        return {
            userStore,
            recipeStore
        }
    },
    data() {
        return {
            myRecipesCount: 0,
            myLikedRecipes: 0,
            myComments: 0,
            selectedFile: null,
            previewUrl: "",
            downloadUrl: null,
            uploadedImageUrl: null
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.previewUrl = URL.createObjectURL(file);
            }
        },
        async uploadToCloudinary() {
            if (!this.selectedFile) return;
            const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dltnbmjar/image/upload';
            const uploadPreset = 'profile_pics'; // If unsigned, use the preset name

            const formData = new FormData();
            formData.append('file', this.selectedFile);
            formData.append('upload_preset', uploadPreset);

            try {
                const response = await fetch(cloudinaryUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    this.uploadedImageUrl = data.secure_url; // The URL of the uploaded image

                    const auth = getAuth();
                    const user = auth.currentUser;

                    if (user) {
                        await updateProfile(user, {
                            photoURL: data.secure_url,
                        });

                        console.log('Updated photoURL:', data.secure_url);
                        this.userStore.user.photoURL = data.secure_url;
                    }
                } else {
                    console.error('Error uploading to Cloudinary:', await response.text());
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                this.selectedFile = null;
                this.previewUrl = "";
            }
        },
    },
    mounted() {
        this.myRecipesCount = this.recipeStore.getRecipesByUserId(this.userStore.user.id).length;
        this.myLikedRecipes = this.recipeStore.getLikedRecipesByUser(this.userStore.user.email).length;
        this.myComments = this.recipeStore.getCommentsByUser(this.userStore.user.email).length;
    }
}
</script>

<style scoped>
.section.profile-heading .column.is-2-tablet.has-text-centered+.has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
}

.stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
}

.stat-key {
    font-size: 1.4em;
    font-weight: 200
}
</style>