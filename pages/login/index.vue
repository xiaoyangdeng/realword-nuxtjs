<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(errs, key1) in errors">
              <li v-for="(err, index) in errs" :key="index">
                {{ key1 }} {{ err }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                v-model="user.username"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
                minlength="8"
              />
            </fieldset>
            <button
              @click="onSubmit"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/index";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "loginIndex",
  middleware: "noLogin",
  computed: {
    isLogin() {
      return this.$route.name == "login";
    },
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async onSubmit() {
      try {
        let param = {
          user: this.user,
        };
        const { data } = this.isLogin
          ? await login(param)
          : await register(param);
        this.$store.commit("setUserMessage", param);

        console.log(data);
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        Cookie.set("userParams", param);

        //跳转首页

        this.$router.push("/");
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>