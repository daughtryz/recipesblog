<template>
  <div class="tabs is-boxed">
    <ul>
      <li
        v-for="category in categoryStore.categories"
        :key="category.name"
        :class="{ 'is-active': category.name === active }"
        @click="selectCategoryName(category.name)"
      >
        <a>
          <span class="icon">
            <img :src="category.image" />
          </span>
          <span>{{ category.name }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCategoryStore } from "@/stores/storeCategory";
export default {
  setup() {
    const categoryStore = useCategoryStore();

    return {
      categoryStore,
    };
  },
  emits: ["selectCategoryName"],
  data() {
    return {
      active: "",
    };
  },
  methods: {
    selectCategoryName(categoryName) {
      this.active = this.active === categoryName ? '' : categoryName;
      this.$emit("selectCategoryName", this.active);
    },
  },
};
</script>
