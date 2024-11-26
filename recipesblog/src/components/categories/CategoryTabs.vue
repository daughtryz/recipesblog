<template>
  <div class="tabs is-boxed">
    <ul>
      <li
        v-for="category in categories"
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
const categories = [
  {
    name: "All",
    image: "/src/assets/categories/maincourse.png",
    isActive: false,
  },
  {
    name: "Salads",
    image: "/src/assets/categories/maincourse.png",
    isActive: false,
  },
  {
    name: "Main course",
    image: "/src/assets/categories/maincourse.png",
    isActive: false,
  },
  {
    name: "Bakery",
    image: "/src/assets/categories/bakery.png",
    isActive: false,
  },
  {
    name: "Soups",
    image: "/src/assets/categories/maincourse.png",
    isActive: false,
  },
  {
    name: "Desserts",
    image: "/src/assets/categories/maincourse.png",
    isActive: false,
  },
  {
    name: "Drinks",
    image: "/src/assets/categories/drinks.png",
    isActive: false,
  },
];
export default {
  emits: ["selectCategoryName"],
  data() {
    return {
      categories,
      active: "",
    };
  },
  methods: {
    selectCategoryName(categoryName) {
      this.active = this.active === categoryName ? '' : categoryName;
      this.$emit("selectCategoryName", categoryName);
    },
  },
};
</script>
