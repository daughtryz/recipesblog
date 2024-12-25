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
                <div class="file is-primary mt-2">
                    <label class="file-label">
                        <input @change="onFileChange" class="file-input" type="file" name="resume" />
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span v-if="!selectedFile" class="file-label">Upload picture…</span>
                            <button v-else @click="uploadToFirebase">Update Photo</button>
                        </span>
                    </label>
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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from "@/js/firebase";
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
            previewUrl: null,
            downloadUrl: null,
        }
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            console.log('on change')
            console.log(file)
            if (file) {
                this.selectedFile = file;
                this.previewUrl = URL.createObjectURL(file);
            }
        },
        async uploadToFirebase() {
            if (!this.selectedFile)
                return;

            try {
                const storageRef = ref(storage, `profilePictures/${this.selectedFile.name}`);
                console.log('After storage ref')
                console.log(storageRef)

                await uploadBytes(storageRef, this.selectedFile);
                console.log('After upload')
                // Get the download URL of the uploaded image
                const downloadUrl = await getDownloadURL(storageRef);

                // Update the user's photoURL
                // const auth = getAuth();
                // const user = auth.currentUser;

                if (this.userStore.user) {
                    await updateProfile(this.userStore.user, {
                        photoURL: downloadUrl,
                    });

                    console.log('Updated photoURL:', downloadUrl);
                }
            } catch (error) {
                console.error('Error updating photoURL:', error);
                this.successMessage = 'Error updating profile photo.';
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