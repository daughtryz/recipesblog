<template>
    <div class='profile-options is-fullwidth'>
        <div class='tabs is-fullwidth is-medium'>
            <ul>
                <li v-for="option in options" class='link' :class="{ 'is-active': option === active }">
                    <a @click.prevent="selectOption(option)">
                        <span class='icon'>
                            <i class='fa fa-list'></i>
                        </span>
                        <span>{{ option }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
const options = ['My Recipes', 'Liked recipes']
export default {
    emits: ['chooseOption'],
    data() {
        return {
            active: '',
            options
        }
    },
    methods: {
        selectOption(option) {
            this.active = this.active === option ? '' : option;
            this.$emit("chooseOption", this.active);
        },
    }
}
</script>

<style scoped>
.container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
}
</style>