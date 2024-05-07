<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    :class="{ 'notification-container': true, 'notification-container-empty': items.length === 0 }"
  >
    <transition-group name="ntf" tag="div" mode="out">
      <div
        v-for="item in items"
        :key="item.id"
        style="position: relative"
        :class="'notification notification-' + item.options.type"
      >
        <div class="notification-message">
          <h4 class="title" v-if="item.title">
            <v-icon
              :class="`${item.options.type}-icon`"
              size="x-large"
              :icon="icons[item.options.type]"
            />
            {{ item.title }}
          </h4>
          <div class="message" v-if="item.message" v-html="item.message" />
        </div>
        <v-icon
          style="position: absolute; right: 5px; top: 5px"
          icon="mdi-close"
          @click="removeItem(item.id)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const icons = {
  info: 'mdi-information-variant-circle-outline',
  success: 'mdi-check-circle',
  warning: 'mdi-alert-octagon',
  error: 'mdi-close-circle'
}

const items = ref([])
const options = ref({
  type: 'success',
  duration: 2000,
  permanent: false
})

const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

const addItem = (type, title, message, customOptions, id) => {
  if (
    items.value.find(
      (it) => it.title == title && it.message == message && id !== null && it.id == id
    )
  )
    return
  const defaultOptions = {
    type,
    duration: options.value.duration,
    permanent: options.value.permanent
  }
  const itemOptions = { ...defaultOptions, ...customOptions }

  const idx = id || createUUID()
  const newItem = {
    id: idx,
    message,
    title,
    options: itemOptions
  }

  items.value.push(newItem)

  if (!itemOptions.permanent) {
    setTimeout(() => {
      removeItem(idx)
    }, itemOptions.duration)
  }
}

const removeItem = (uid) => {
  items.value = [...items.value.filter((x) => x.id !== uid)]
}

defineExpose({
  addItem
})
</script>

<style lang="scss">
$border-radius: 5px;
$foreground-color: black;
$shadowOffsetsBottom: 1 3 6 10 15;
$shadowBlursBottom: 3 6 6 5 6;
$shadowOpacitiesBottom: 0.04 0.1 0.2 0.22 0.22;
$shadowOffsetsTop: 1 3 10 14 19;
$shadowBlursTop: 1.5 5 10 14 19;
$shadowOpacitiesTop: 0.04 0.1 0.19 0.25 0.3;
@function bottom-shadow($depth) {
  $primary-offset: nth($shadowOffsetsBottom, $depth) * 1px;
  $blur: nth($shadowBlursBottom, $depth) * 5px;
  $color: rgba(black, nth($shadowOpacitiesBottom, $depth));
  @return 0 $primary-offset $blur $color;
}
@function top-shadow($depth) {
  $primary-offset: nth($shadowOffsetsTop, $depth) * 1px;
  $blur: nth($shadowBlursTop, $depth) * 4px;
  $color: rgba(black, nth($shadowOpacitiesTop, $depth));

  @return 0 $primary-offset $blur $color;
}

@mixin depth($depth) {
  @if $depth < 1 {
    box-shadow: none;
  } @else if $depth > 5 {
    @warn "Invalid $depth `#{$depth}` for mixin `card`.";
  } @else {
    box-shadow: bottom-shadow($depth), top-shadow($depth);
  }
}

.notification {
  border-radius: $border-radius;
  @include depth(1);
  padding: 25px 25px 25px 25px;
}

.notification:before {
  content: '';
  display: none;
}

.notification-info {
  color: $foreground-color;
  background-color: #b6d3fa;
  border: 1px solid #025fe0;
  .notification-message {
    .title {
      color: $foreground-color;
      .info-icon {
        color: #025fe0;
      }
    }
    .message {
      color: $foreground-color;
    }
  }
}

.notification-success {
  color: $foreground-color;
  background-color: #d9faca;
  border: 1px solid #6cb36c;
  .notification-message {
    .title {
      color: $foreground-color;
      .success-icon {
        color: #6cb36c;
      }
    }
    .message {
      color: $foreground-color;
    }
  }
}

.notification-warning {
  color: $foreground-color;
  background-color: #fcedb1;
  border: 1px solid #edbf05;
  .notification-message {
    .title {
      color: $foreground-color;
      .warning-icon {
        color: #edbf05;
      }
    }
    .message {
      color: $foreground-color;
    }
  }
}
.notification-error {
  color: $foreground-color;
  background-color: #ffcfd5;
  border: 1px solid #fa0223;
  .notification-message {
    .title {
      color: $foreground-color;
      .error-icon {
        color: #fa0223;
      }
    }
    .message {
      color: $foreground-color;
    }
  }
}

div[data-notify='container'] {
  padding: 18px;
}

.notification-container {
  box-sizing: border-box;
  position: fixed;
  bottom: 40px;
  right: 0;
  z-index: 999999;
  width: 380px;
  padding: 0px 15px;
  max-height: calc(100% - 30px);
  overflow-x: hidden;
  overflow-y: auto;
}

.notification {
  box-sizing: border-box;
  padding: 15px 15px 15px 25px;
  border-radius: $border-radius;
  cursor: pointer;
  font-size: 1em;
  line-height: 1.2em;
  position: relative;
  opacity: 0.9;
  margin-top: 15px;
}

.notification .title {
  font-size: 1.2em;
  line-height: 1.2em;
  font-weight: bold;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.notification:hover,
.notification:focus {
  opacity: 1;
}

.notification-enter {
  visibility: hidden;
  transform: translate3d(100%, 0, 0);
}

.notification-enter.notification-enter-active {
  visibility: visible;
  transform: translate3d(0, 0, 0);
  transition: all 0.4s;
}

.notification-leave {
  visibility: visible;
  transform: translate3d(0, 0, 0);
}

.notification-leave.notification-leave-active {
  visibility: hidden;
  transform: translate3d(100%, 0, 0);
  transition: all 0.4s;
}

.ntf-enter {
  opacity: 0;
}
.ntf-leave {
  opacity: 1;
}
.ntf-enter-active {
  animation: slideInRight 0.4s;
}
.ntf-leave-active {
  animation: slideOutRight 0.4s;
}

@-webkit-keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInRight {
  from {
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInRight {
  -webkit-animation-name: slideInRight;
  animation-name: slideInRight;
}

@-webkit-keyframes slideOutRight {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes slideOutRight {
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}

.slideOutRight {
  -webkit-animation-name: slideOutRight;
  animation-name: slideOutRight;
}
</style>
