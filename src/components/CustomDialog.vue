<template>
  <div class="text-center">
    <v-btn color="primary">
      Open Dialog
      <v-dialog  v-model="dialog" activator="parent" width="auto">
        <v-card>
          <v-card-item>
            <div class="text-center text-h3">
              <v-icon color="primary" :icon="icon"></v-icon>
            </div>
            <div>
              <h4 class="text-h4">{{ heading }}</h4>
            </div>
            <v-card-text class="text-center">
              {{ text }}
            </v-card-text>
          </v-card-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green-darken-1" variant="text" @click="dialog = false"> Disagree </v-btn>
            <v-btn color="green-darken-1" variant="text" @click="dialog = false"> Agree </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'CustomDialog',
  props: {
    icon: String,
    heading: String,
    text: String
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
