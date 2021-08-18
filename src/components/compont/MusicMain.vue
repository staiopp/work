<template>
	<div class="musicMain">
		<el-container>
			<el-aside width="200px" height="250px">
				<menu-left></menu-left>
			</el-aside>
			<el-container>
				<!-- <el-header style="background-color: white;">
				<main-head></main-head>
			</el-header> -->
				<el-main style="background-color: #31362a;padding: 0; height: 500px; overflow: auto;
				overflow-x: visible;padding: 30;padding-bottom: 0;">
					<!-- <main-head style="line-height: 40px;"></main-head> -->
					<router-view :key="key" style="margin: 10px;margin-bottom: 0;padding: 0;line-height: 40px;" @gUrl="gotUrl" @giveUrl="gotUrl"></router-view>
					<!-- <div class="audio-wz">
						<audio controls="controls" :src="musicurl" autoplay="autoplay" class="music-audio1 ">
						</audio>
					</div> -->
				</el-main>
			</el-container>
		</el-container>
		<div class="audio-wz">
			<audio controls="controls" :src="musicurl" autoplay="autoplay" class="music-audio1 ">
			</audio>
		</div>
	</div>
</template>

<script>
	import menuLeft from '../main-com/menu-left.vue'
	import mainHead from '../main-com/main-head.vue'
	export default {
		components: {
			menuLeft,
			mainHead
		},
		computed: {
			key() {
				return this.$route.fullPath
			}
		},
		data() {
			return {
				musicurl: "",
				isRouterAlive: true
			}
		},
		methods: {
			gotUrl: function(url) {
				// console.log(55555)
				// console.log(url)
				this.musicurl = url
			},
			reload() {
				this.isRouterAlive = false;
				this.$nextTick(() => {
					this.isRouterAlive = true;
				})
			}
		}
	}
</script>

<style>
	.musicMain {
		width: 1295px;
		border: 2px solid palevioletred;
		background-color: #303133;
	}

	.audio-wz {
		position: absolute;
		top: 600px;
		left: 500px;
	}

	.music-audio1 {
		width: 500px;
	}

	.main-lunbo {
		background-color: white;
		height: 500px;
		overflow: scroll;
		overflow-x: visible;
	}

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 160px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	::-webkit-scrollbar-button {
		display: none;
	}

	::-webkit-scrollbar {
		width: 8px;
		background-color: #31362a;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background: black;
	}
</style>
