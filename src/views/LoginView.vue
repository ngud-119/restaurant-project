<template>
  <section class="login-section">
    <div class="login-container">
      <h1 class="logo">BSS Restaurant</h1>
      <div class="form-container">
        <form @submit.prevent="submitLoginInfo">
          <div class="mb-5">
            <p class="input-label">Username:</p>
            <input class="input-field" type="text" v-model="user.userName" name="userName" id="userName" required>
          </div>
          <div class="mb-5">
            <p class="input-label">Password:</p>
            <input class="input-field" type="password" v-model="user.password" name="password" id="password" required>
          </div>
          <div>
            <input class="submit-btn" type="submit" value="Login">
          </div>
        </form>
      </div>
      <div class="mt-5 text-center">
        <RouterLink class="link" to="/admin-add-food">Back To Home</RouterLink>
      </div>
    </div>
    <LoadingSpinner v-if="getLoadingState"></LoadingSpinner>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LoadingSpinner from "../components/LoadingSpinner.vue"

export default {
  name: "LoginView",
  components: {
    LoadingSpinner
  },
  data() {
    return {
      user: {
        userName: "",
        password: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      getToken: "getToken",
      getCurrentUser: "getCurrentUser",
      getLoadingState: "getLoadingState"
    })
  },
  methods: {
    ...mapActions({
      loginUser: 'loginUser',
    }),

    async submitLoginInfo() {
      await this.loginUser(this.user)

      this.$router.push({ name: "admin" })
    }
  },
  mounted() {
    console.log("mounted");
    let currentUser = this.getCurrentUser;
    if (currentUser) {
      this.$router.push({ path: "/admin" })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/config";
@import "../assets/responsive";

.login-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-container {
    width: 90%;
    background-color: #f1f1f1;
    padding: 30px;
    border-radius: 10px;

    @include lg {
      width: 540px;
    }

    .logo {
      font-size: 32px;
      font-weight: 600;
      text-align: center;
      color: $primary;
      margin-bottom: 30px;
    }

    .form-container {

      .input-label {
        font-size: 18px;
        margin-bottom: 8px;
      }

      .input-field {
        width: 100%;
        outline: none;
        font-size: 18px;
        padding: 10px;
        border: 2px solid gray;
        border-radius: 5px;
      }

      .submit-btn {
        font-size: 18px;
        width: 100%;
        color: white;
        background-color: $primary;
        padding: 15px 0px;
        border-radius: 5px;

        &:hover {
          background-color: darken($primary, 10);
        }
      }
    }

    .link {
      color: $primary;
      text-decoration: none;
    }
  }
}
</style>