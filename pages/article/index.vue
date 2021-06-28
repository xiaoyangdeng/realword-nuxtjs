<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content" v-html="article.body"></div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comment :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticlesDetail } from "@/api/articles";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComment from "./components/article-comment.vue";
export default {
  name: "articleIndex",
  middleware: "isLogin",
  components: {
    ArticleMeta,
    ArticleComment,
  },
  async asyncData({ params }) {
    const { data } = await getArticlesDetail(params.slug);
    console.log(data);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      article: article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - realworld`,
      // titleTemplate: "%s - Nuxt.js",
      meta: [
        { charset: "utf-8" },
        // { name: "viewport", content: "width=device-width, initial-scale=1" },

        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>