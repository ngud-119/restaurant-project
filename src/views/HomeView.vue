<template>
  <header>
    <v-carousel cycle height="100vh" hide-delimiter-background show-arrows="hover">
      <v-carousel-item :src="this.Img1" cover>
        <v-sheet color="#00000050" height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="slide-text-container">
              <h2 color="slide-text">Slide</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione deserunt quaerat cumque et
                necessitatibus modi sit voluptatum eveniet animi explicabo!
              </p>
              <v-btn variant="elevated">Order Now</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item :src="this.Img2" cover>
        <v-sheet color="#00000050" height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="slide-text-container">
              <h2 color="slide-text">Slide</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione deserunt quaerat cumque et
                necessitatibus modi sit voluptatum eveniet animi explicabo!
              </p>
              <v-btn variant="elevated">Order Now</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item :src="this.Img3" cover>
        <v-sheet color="#00000050" height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="slide-text-container">
              <h2>Slide Heading</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione deserunt quaerat cumque et
                necessitatibus modi sit voluptatum eveniet animi explicabo!
              </p>
              <v-btn variant="elevated">Order Now</v-btn>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </header>
  <main>
    <h2>acscsc</h2>
  </main>
</template>


<script>
import { mapGetters } from 'vuex';
import MainNav from '../components/MainNav.vue';
import Img1 from "../assets/img/homeImg/slider1.jpeg";
import Img2 from "../assets/img/homeImg/slider2.jpg";
import Img3 from "../assets/img/homeImg/slider3.jpg";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      Img1: Img1,
      Img2: Img2,
      Img3: Img3,
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First Img',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
  computed: {
    ...mapGetters({
      getCount: "getCount",
    })
  },
  mounted() {
    console.log(Img3);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/config";

.slide-text-container {
  color: white;

  h2{
    font-size: 70px;
  }
}
</style>