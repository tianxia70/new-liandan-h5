<template>
	<div class="tabbar-container">
		<div class="tabbar-content">
				<router-view></router-view>
		</div>

		<div class="tabbar-bottom">
			<!-- <v-navbar :idx="idx" @change="change"></v-navbar> -->
			<van-tabbar v-model="tabActive">
				<van-tabbar-item name="home" replace to="/home">
					<template #icon="props">
						<img v-if="props.active" src="@/assets/images/tab-bar/home_act.jpeg" />
						<img v-else src="@/assets/images/tab-bar/home.jpeg" />
					</template>
					{{ $t('首页') }}
				</van-tabbar-item>
				<van-tabbar-item name="invite" replace to="/invite">
					<template #icon="props">
						<img v-if="props.active" src="@/assets/images/tab-bar/invite_act.jpeg" />
						<img v-else src="@/assets/images/tab-bar/invite.jpeg" />
					</template>
					{{ $t('邀请') }}
				</van-tabbar-item>
				<van-tabbar-item name="start" replace to="/start" class="center">
					<template #icon="props">
						<img class="center-img" v-if="props.active" src="@/assets/images/tab-bar/start_act.jpeg" />
						<img class="center-img" v-else src="@/assets/images/tab-bar/start.jpeg" />
					</template>
					{{ $t('开始') }}
				</van-tabbar-item>
				<van-tabbar-item name="task" replace to="/task" >
					<template #icon="props">
						<img v-if="props.active" src="@/assets/images/tab-bar/history_act.jpeg" />
						<img v-else src="@/assets/images/tab-bar/history.jpeg" />
					</template>
					{{ $t('历史') }}
				</van-tabbar-item>
				<van-tabbar-item name="me" replace to="/me" >
					<template #icon="props">
						<img v-if="props.active" src="@/assets/images/tab-bar/me_act.jpeg" />
						<img v-else src="@/assets/images/tab-bar/me.jpeg" />
					</template>
					{{ $t('我的') }}
				</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<script setup>
//   import NavBar from "@/components/BottomNavigation"
import { onMounted, ref, watchEffect, computed } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const tabActive = ref(route.name)

watchEffect(() => {
	tabActive.value = route.name
})


</script>

<style scoped lang="scss">
.tabbar-container {
	width: 100%;
	height: 100%;
	position: relative;
	max-width: 750px;
	// display: flex;
	// flex-direction: column;


	.tabbar-content {
		width: 100%;
		// height: 100%;
		height: calc(100% - var(--van-tabbar-height));
		// overflow-y: auto;
		background-color: #f5f5f5;
		z-index: 1;
		position: relative;
	}

	.tabbar-bottom {
		height: var(--van-tabbar-height);
		width: 100%;
		position: relative;
		// position: fixed;
		// left: 0;
		// bottom: 0;
		z-index: 2;

		.center {
			width: 70px;
			height: 70px;
			border-radius: 50%;
			position: relative;
			top: -20px;
			background-color: #fff;
			z-index: 10;
			font-size: 16px;

			.center-img {
				height: 36px;
			}
		}
	}


	.lunpan-box {
		position: absolute;
		z-index: 11;
		right: 0;
		top: 50%;
		width: 68px;
		height: 55px;


		.close {
			position: absolute;
			right: 0;
			top: -20px;
			// padding: 10px;
			line-height: 1;
			width: 40px;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 16px;
				height: 16px;
				margin: 0;
			}
		}

		.img {
			width: 100%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>