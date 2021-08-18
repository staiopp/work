<template>
	<div class="m-left">
		<el-row class="tac">
			<el-col :span="12">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
				 text-color="#fff" active-text-color="#ffd04b">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>发现音乐</span>
						</template>
						<router-link to="/one">
							<el-menu-item index="1-1">个性推荐</el-menu-item>
						</router-link>
						<router-link to="/two">
							<el-menu-item index="1-2">海量歌单</el-menu-item>
						</router-link>
						<span @click="givePHList">
							<router-link to="/three">
								<el-menu-item index="1-3">音乐排行</el-menu-item>
							</router-link>
						</span>
						<span @click="giveNewList">
						<router-link to="/four">
							<el-menu-item index="1-4">最新音乐</el-menu-item>
						</router-link>
						</span>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>1</span>
						</template>
						<router-link to="/one">
							<el-menu-item index="2-1">?</el-menu-item>
						</router-link>
						<router-link to="/two">
							<el-menu-item index="2-2">?</el-menu-item>
						</router-link>
						<router-link to="/three">
							<el-menu-item index="2-3">?</el-menu-item>
						</router-link>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>1</span>
						</template>
						<router-link to="/one">
							<el-menu-item index="3-1">?</el-menu-item>
						</router-link>
						<router-link to="/two">
							<el-menu-item index="3-2">?</el-menu-item>
						</router-link>
						<router-link to="/three">
							<el-menu-item index="3-3">?</el-menu-item>
						</router-link>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>1</span>
						</template>
						<router-link to="/one">
							<el-menu-item index="4-1">?</el-menu-item>
						</router-link>
						<router-link to="/two">
							<el-menu-item index="4-2">?</el-menu-item>
						</router-link>
						<router-link to="/three">
							<el-menu-item index="4-3">?</el-menu-item>
						</router-link>
					</el-submenu>
				</el-menu>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				paiHangList: [],
				difList: [],
				imgUrl: [],
				newSongs : []
			}
		},
		mounted() {
			// console.log("left-mount")
			this.axios.get("/api/toplist")
				.then((res) => {
					// console.log("three")
					// console.log(res.data.list)
					// console.log("three")
					this.paiHangList = res.data.list
					// console.log(this.paiHangList)
				})
				.catch((err) => {
					console.log(err)
				})
			this.axios.get("/api/personalized/newsong?limit=20")
				.then((res) => {
					// console.log("newsong")
					// console.log(res.data)
					this.newSongs = res.data.result
				})
				.catch((err) => {
					console.log(err)
				})
		},

		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			givePHList() {
				this.$router.push({
					name: 'Three',
					params: {
						phList: this.paiHangList,
						// imList: this.imgUrl,
						// dfList: this.difList
					}
				})
			},
			giveNewList() {
				this.$router.push({
					name: 'Four',
					params: {
						newList: this.newSongs
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.m-left {
		overflow: scroll;
		overflow-x: hidden;
		height: 500px;
		background-color: rgb(84, 92, 100);
		;
	}

	.el-col-12 {
		width: 200px;
		height: 500px;
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
		background: #000000;
	}
</style>
