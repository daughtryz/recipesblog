<template>
    <div class='section profile-heading'>
        <div class='columns is-mobile is-multiline'>
            <div class='column is-2'>
                <span class='header-icon user-profile-image'>
                    <img alt='' src='http://placehold.it/300x225'>
                </span>
            </div>
            <div class='column is-4-tablet is-10-mobile name'>
                <p>
                    <span class='title is-bold'>{{ userStore.user.email }}</span>
                    <br>
                    <button class='button is-primary is-outlined' href='#' id='edit-preferences' style='margin: 5px 0'>
                        Edit
                    </button>
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
            myComments: 0
        }
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