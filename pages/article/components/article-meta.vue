<template>
  <div class="article-meta">
    <nuxt-link
      :to="{ name: 'profile', params: { username: article.author.username } }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <a href=""></a>
    <div class="info">
      <a href="" class="author">{{ article.author.username }}</a>
      <span class="date">{{ article.createdAt | data("MMM DD,YYYY") }}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{ active: article.author.following }"
      v-show="!canModify"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow Eric Simons <span class="counter"></span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{ active: article.favorited }"
      v-show="!canModify"
    >
      <i class="ion-heart"></i>
      &nbsp; Favorite Post
      <span class="counter">({{ article.favoritesCount }})</span>
    </button>
    <span v-show="canModify" class="ng-scope">
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        ui-sref="app.editor({ slug: $ctrl.article.slug })"
        :to="{
          name: `editor`,
          params: {
            slug: article.slug,
          },
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle()">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deleteArticles } from "@/api/articles";
export default {
  name: "articleMeta",
  props: {
    article: {
      type: Object,
      require: true,
    },
    // canModify: Boolean,
  },
  computed: {
    ...mapState(["user"]),
    canModify() {
      return this.user.username == this.article.author.username;
    },
  },
  methods: {
    async deleteArticle() {
      const { data } = await deleteArticles(this.article.slug);
      this.$router.push({
        name: "home",
        query: {
          tab: "your_feed",
        },
      });
    },
  },
};
</script>

<style>
</style>