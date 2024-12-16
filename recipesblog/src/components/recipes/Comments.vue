<template>
  <article v-for="comment in comments" :key="comment.postTime" class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="comment.userImageUrl" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.username }}</strong>
          <br />
          {{ comment.content }}
          <br />
          <small><a>Like</a> · <a>Reply</a> · {{ comment.postTime }}</small>
        </p>
      </div>

      <!-- <article class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img
                      src="https://bulma.io/assets/images/placeholders/96x96.png"
                    />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Sean Brown</strong>
                      <br />
                      Donec sollicitudin urna eget eros malesuada sagittis.
                      Pellentesque habitant morbi tristique senectus et netus et
                      malesuada fames ac turpis egestas. Aliquam blandit nisl a
                      nulla sagittis, a lobortis leo feugiat.
                      <br />
                      <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                    </p>
                  </div>

                  <article class="media">
                    Vivamus quis semper metus, non tincidunt dolor. Vivamus in
                    mi eu lorem cursus ullamcorper sit amet nec massa.
                  </article>

                  <article class="media">
                    Morbi vitae diam et purus tincidunt porttitor vel vitae
                    augue. Praesent malesuada metus sed pharetra euismod. Cras
                    tellus odio, tincidunt iaculis diam non, porta aliquet
                    tortor.
                  </article>
                </div>
              </article> -->

      <!-- <article class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img
                      src="https://bulma.io/assets/images/placeholders/96x96.png"
                    />
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>Kayli Eunice </strong>
                      <br />
                      Sed convallis scelerisque mauris, non pulvinar nunc mattis
                      vel. Maecenas varius felis sit amet magna vestibulum
                      euismod malesuada cursus libero. Vestibulum ante ipsum
                      primis in faucibus orci luctus et ultrices posuere cubilia
                      Curae; Phasellus lacinia non nisl id feugiat.
                      <br />
                      <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                    </p>
                  </div>
                </div>
              </article> -->
    </div>
  </article>
</template>

<script>
import { useRecipeStore } from "@/stores/storeRecipe";

export default {
  props: ["recipeId"],
  setup() {
    const recipeStore = useRecipeStore();

    return {
      recipeStore,
    };
  },
  data() {
    return {
      comments: [],
    };
  },
  computed: {
    timeSinceComment(publishedDate) {
      console.log("timeSinceComment");
      console.log(publishedDate);
      const now = new Date();
      const published = new Date(publishedDate);

      // Calculate the difference in milliseconds
      const diffMs = now - published;

      // Calculate differences in various time units
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30); // Approximation for months
      const diffYears = Math.floor(diffDays / 365); // Approximation for years

      if (diffYears > 0) {
        return diffYears === 1 ? "1 year ago" : `${diffYears} years ago`;
      } else if (diffMonths > 0) {
        return diffMonths === 1 ? "1 month ago" : `${diffMonths} months ago`;
      } else if (diffDays > 0) {
        return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
      } else if (diffHours > 0) {
        return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
      }
      return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
    },
    publishedDate(published) {
      console.log(published);
      return new Date(published).toString();
    },
  },
  created() {
    this.comments = this.recipeStore.getRecipeById(this.recipeId).comments;
  },
};
</script>
