<template>
  <section class="login-section-bg">
    <div class="login-section">
      <transition appear @after-enter="loginImgEnterAnimation">
        <div class="img-container">
          <transition appear @after-enter="imgRotate">
            <img src="../assets/img/login-bg.png" alt="" />
          </transition>
        </div>
      </transition>
      <div class="login-container-wrapper">
        <transition appear @after-enter="loginEnterAnimation">
          <div class="login-container">
            <div class="logo">
              <img src="../assets/logo.png" alt="" width="110" />
              <p class="logo-text">BSS RESTAURANT</p>
            </div>
            <div class="form-container">
              <form @submit.prevent="submitLoginInfo">
                <div class="mb-5">
                  <p class="input-label">Username:</p>
                  <input
                    class="input-field"
                    type="text"
                    v-model="user.userName"
                    name="userName"
                    id="userName"
                    required
                  />
                </div>
                <div class="mb-5">
                  <p class="input-label">Password:</p>
                  <div class="position-relative">
                    <input
                      class="input-field"
                      :type="!showPass ? 'password' : 'text'"
                      v-model="user.password"
                      name="password"
                      id="password"
                      required
                    />
                    <div class="eye-icon">
                      <v-icon
                        v-if="!showPass"
                        icon="mdi-eye-off-outline"
                        @click="() => (showPass = !showPass)"
                      ></v-icon>
                      <v-icon
                        v-if="showPass"
                        icon="mdi-eye-outline"
                        @click="() => (showPass = !showPass)"
                      ></v-icon>
                    </div>
                  </div>
                </div>
                <div>
                  <input class="submit-btn" type="submit" value="Login" />
                </div>
              </form>
            </div>
            <div class="mt-5 text-center">
              <RouterLink class="link" to="/admin-add-food">Back To Home</RouterLink>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      showPass: false,
      user: {
        userName: 'admin@mail.com',
        password: 'Admin@123'
      }
    }
  },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      getCurrentUser: 'getCurrentUser',
      getLoadingState: 'getLoadingState'
    })
  },
  methods: {
    ...mapActions({
      loginUser: 'loginUser'
    }),

    imgRotate(el) {
      gsap.to(el, {
        rotate: 360,
        repeat: -1,
        ease: 'none',
        duration: 30
      })
    },

    loginImgEnterAnimation(el) {
      gsap.from(el, {
        y: -2500,
        ease: 'expo',
        duration: 2
      })
    },

    loginEnterAnimation(el) {
      gsap.from(el, {
        x: 2500,
        ease: 'expo',
        duration: 1.5
      })
    },

    async submitLoginInfo() {
      await this.loginUser(this.user)

      this.$router.push({ name: 'allEmployees' })
    }
  },
  mounted() {
    console.log('mounted')
    let currentUser = this.getCurrentUser
    if (currentUser) {
      this.$router.push({ path: '/employees' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/config';
@import '../assets/responsive';
@import '../styles/component';

.login-section-bg {
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)),
    url('../assets/img/dash-bg.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .login-section {
    max-width: 1600px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    align-items: center;

    .img-container {
      background: url('../assets/img/food-bg2.png');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 1000px;
      width: 50%;
      height: 100%;
      display: none;
      justify-content: center;
      align-items: center;
      filter: drop-shadow(8px 8px 10px rgba(0, 0, 0, 0.25));

      @include lg {
        display: flex;
      }

      img {
        display: block;
        width: 480px;
        height: 480px;
        filter: drop-shadow(20px 15px 25px #aaaaaa);
        transform: rotate(0deg);
        //animation: spin 40s linear infinite;
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
        padding: 20px;
        border-radius: 10px;
        // box-shadow:
        //   0 10px 20px rgba(0, 0, 0, 0.19),
        //   0 6px 6px rgba(0, 0, 0, 0.23);

        @include lg {
          width: 540px;
          padding: 30px 45px 30px 45px;
        }

        .logo {
          text-align: center;
          margin-bottom: 20px;

          img {
            // mix-blend-mode: color-burn;
          }

          .logo-text {
            margin-top: 10px;
            font-size: 24px;
            font-weight: 700;
            color: white;
            letter-spacing: 2px;
            text-shadow:
              $primary 2px 0px 0px,
              $primary 1.75517px 0.958851px 0px,
              $primary 1.0806px 1.68294px 0px,
              $primary 0.141474px 1.99499px 0px,
              $primary -0.832294px 1.81859px 0px,
              $primary -1.60229px 1.19694px 0px,
              $primary -1.97998px 0.28224px 0px,
              $primary -1.87291px -0.701566px 0px,
              $primary -1.30729px -1.5136px 0px,
              $primary -0.421592px -1.95506px 0px,
              $primary 0.567324px -1.91785px 0px,
              $primary 1.41734px -1.41108px 0px,
              $primary 1.92034px -0.558831px 0px;

            @include lg {
              font-size: 32px;
            }
          }
        }

        .form-container {
          .input-label {
            font-size: 18px;
            margin-bottom: 8px;
          }

          .eye-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translate(0%, -50%);

            &:hover {
              cursor: pointer;
              color: $primary;
            }
          }

          .input-field {
            width: 100%;
            outline: none;
            font-size: 18px;
            padding: 10px;
            padding-right: 50px;
            border: 2px solid gray;
            border-radius: 5px;

            &:focus {
              border-color: $secondary;
            }
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
}
</style>
