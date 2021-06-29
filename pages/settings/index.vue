<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="params.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="params.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="params.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="params.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="params.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { putRegister } from "@/api/index";
export default {
  name: "settingsIndex",
  middleware: "isLogin",
  data() {
    return {
      params: {
        email: "1219575252@qq.com",
        bio: null,
        image:
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F25%2F20200525185313_eoibs.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626332110&t=16b3ade5f2f11583436b2ef41eb98bde",
        username: "deng",
        password: "881314.deng",
      },
    };
  },
  computed: {
    ...mapState(["userParams", "user"]),
  },
  mounted() {
    this.params = JSON.parse(JSON.stringify(this.user));
    this.params.password = this.userParams.user.password;
  },
  methods: {
    async updateUser() {
      console.log("ddd");
      const { data } = await putRegister({ user: this.params });
      this.$store.commit("setUserMessage", { user: this.params });
      this.$store.commit("setUser", data.user);
      Cookie.set("user", data.user);
      Cookie.set("userParams", { user: this.params });
      this.$router.push({
        name: "profile",
        params: {
          username: this.user.username,
        },
      });
    },
  },
};
</script>

<style>
</style>