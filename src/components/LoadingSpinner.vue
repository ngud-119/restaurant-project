<template>
	<div class="loading-container">
		<swapping-squares-spinner :animation-duration="1000" :size="65" color="#f25b0a" />
	</div>
</template>

<script>
import { SwappingSquaresSpinner } from 'epic-spinners'
export default {
	name: "LoadingSpinner",
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
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;

}
</style>