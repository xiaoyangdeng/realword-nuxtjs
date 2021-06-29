<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="formData.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="formData.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="formData.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publicArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicArticles, modifyArticles } from "@/api/editor";
import { getArticlesDetail } from "@/api/articles.js";
export default {
  name: "editorIndex",
  middleware: "isLogin",
  data() {
    return {
      formData: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      slug: "",
    };
  },
  // async asyncData({ params }) {
  //   if (params.slug) {
  //     const { data } = await getArticlesDetail(params.slug);
  //     this.formData = data;
  //     delete this.formData.slug;
  //   }
  //   return {
  //     slug: params.slug || "",
  //   };
  // },
  mounted() {
    let params = this.$route.params;
    const that = this;
    if (params.slug) {
      getArticlesDetail(params.slug).then((res) => {
        console.log(res);
        console.log("dddd");
        that.formData = res.data.article;
        that.slug = params.slug || "";
        delete that.formData.slug;
      });
    }
  },

  methods: {
    async publicArticle() {
      let article = {};
      if (this.slug == "") {
        const { data } = await publicArticles(this.formData);
        article = data;
      } else {
        const { data } = await modifyArticles({
          data: this.formData,
          slug: this.slug,
        });
        article = data;
      }

      this.$router.push({
        name: `article-slug-here`,
        params: {
          slug: article.article.slug,
          canModify: true,
        },
      });
    },
  },
};
</script>

<style>
</style>