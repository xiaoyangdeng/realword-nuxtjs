<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img class="comment-author-img" :src="user.image" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <a href="" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </a>
        &nbsp;
        <a href="" class="comment-author">{{ comment.author.username }}</a>
        <span class="date-posted">
          {{ comment.createdAt | data("MMM DD,YYYY") }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from "@/api/articles";
import { mapState } from "vuex";
export default {
  props: {
    article: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      comments: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    console.log(data);
    this.comments = data.comments;
    console.log("999");
  },
};
</script>

<style>
</style>