<template>
  <section class="login-section">
    <div class=" img-container">
      <img src="../assets/img/login-bg.png" alt="">
    </div>
    <div class="login-container-wrapper">
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
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "LoginView",
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
@import "../styles/component";

.login-section {
  max-width: 1600px;
  margin: 0 auto;
  height: 100vh;
  display: flex;

  align-items: center;

  .img-container {
    background: url("../assets/img/food-bg2.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1000px;
    width: 50%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;

    @include lg {
      display: flex;
    }

    img {
      display: block;
      width: 480px;
      height: 480px;
      filter: drop-shadow(20px 15px 25px #aaaaaa);
      transform: rotate(0deg);
      animation: spin 40s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }

  .login-container-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @include lg {
      width: 50%;
    }

    .login-container {
      width: 90%;
      background-color: #f1f1f1;
      padding: 80px 45px 80px 45px;
      border-radius: 10px;

      @include lg {
        width: 540px;
      }

      .logo {
        text-align: center;
        color: $primary;
        margin-bottom: 30px;
        @include logo
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
}
</style>