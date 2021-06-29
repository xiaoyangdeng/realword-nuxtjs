<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{
                profile.following ? "Unfollow akbarMA" : "Follow Eric Simons"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link active"
                  :class="{ active: tab == 'my_articles' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles',
                    },
                  }"
                  >My Articles</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{ active: tab == 'favorited_articles' }"
                  exact
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles',
                    },
                  }"
                  >Favorited Articles</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="(article, index) in articles"
            :key="index"
          >
            <div class="article-meta">
              <a href=""><img :src="article.author.image" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">
                  {{ article.updatedAt | data("MMM DD,YYYY") }}
                </span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="favorite(article)"
                :disabled="article.favoritedDisable"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{
                name: `article-slug-here`,
                params: {
                  slug: article.slug,
                  tag: $route.query.tag,
                },
              }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{ active: item == page }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'profile',
                    query: {
                      page: item,
                      username: profile.username,
                    },
                  }"
                  >{{ item }}</nuxt-link
                >
                <!-- <a class="page-link" href="">{{ item }}</a> -->
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, getArticlesList } from "@/api/profile";
import { addFavorite, deleteFavorite } from "@/api/articles";
import { mapState } from "vuex";
export default {
  name: "profileIndex",
  middleware: "isLogin",
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  watchQuery: ["page", "tab"],
  async asyncData({ params, query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 2;

    const { data } = await getUser(params.username);

    const tab = query.tab || "my_articles";
    let param =
      store.state.user && tab == "my_articles"
        ? {
            author: data.profile.username,
            limit,
            offset: (page - 1) * limit,
          }
        : {
            favorited: data.profile.username,
            limit,
            offset: (page - 1) * limit,
          };
    const data1 = await getArticlesList(param);
    const { articlesCount, articles } = data1.data;

    return {
      profile: data.profile,
      articles,
      articlesCount,
      limit,
      page,
      tab,
    };
  },
  methods: {
    async favorite(article) {
      article.favoritedDisable = true;
      console.log(article);
      if (article.favorited) {
        //取消点赞
        await deleteFavorite(article.slug);
        article.favoritesCount += -1;
        article.favorited = false;
      } else {
        // 点赞
        await addFavorite(article.slug);
        article.favoritesCount += 1;
        article.favorited = true;
      }
      article.favoritedDisable = false;
    },
  },
};
</script>

<style>
</style>