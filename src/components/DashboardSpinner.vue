<template>
    <div class="loading-container">
        <div class="loader">
            <swapping-squares-spinner :animation-duration="1000" :size="80" color="#cc080b" />
        </div>
    </div>
</template>

<script>
import { SwappingSquaresSpinner } from 'epic-spinners'
export default {
    name: "DashboardSpinner",
    components: {
        SwappingSquaresSpinner
    },
}
</script>

<style lang="scss" scoped>
.loading-container {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.6);
    width: 100vw;
    height: 90vh;
    z-index: 10;

    .loader {
        height: 100%;
        transform: translate(40%, 45%);
    }
}
</style>