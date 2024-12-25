<template>
    <div class='columns'>
        <div class='container profile'>
            <UserProfileHeading />
            <UserProfileOptions @choose-option="handleChooseOption" />

            <div v-if="recipes.length > 0" class="fixed-grid has-3-cols">
                <div class="grid is-gap-5">
                    <div v-for="recipe in recipes" :key="recipe.name" class="cell">
                        <div class="card">
                            <Recipe :recipe="recipe" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/storeAuth';
import UserProfileHeading from '@/components/users/UserProfileHeading.vue';
import UserProfileOptions from '@/components/users/UserProfileOptions.vue';
import { useRecipeStore } from '@/stores/storeRecipe';
import Recipe from '@/components/recipes/Recipe.vue';

export default {
    components: {
        UserProfileHeading,
        UserProfileOptions,
        Recipe,
    },
    data() {
        return {
            recipes: [],
        }
    },
    setup() {
        const userStore = useUserStore();
        const recipeStore = useRecipeStore();

        return {
            userStore,
            recipeStore
        }
    },
    methods: {
        handleChooseOption(option) {
            console.log(option)
            if (option === 'My Recipes') {
                this.recipes = this.recipeStore
                    .getRecipesByUserId(this.userStore.user.id);
            }
            
            if (option === 'Liked recipes') {
                this.recipes = this.recipeStore
                    .getLikedRecipesByUser(this.userStore.user.email);
            }
        }
    }
}
</script>

<style scoped>
.container.profile {
    margin-top: 1%;
}

.control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
}

.modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
}
</style>