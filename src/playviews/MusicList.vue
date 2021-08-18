<template>
	<div>
		<el-table :data="pList" style="width: 100%" height="400">
			<el-table-column prop="name" label="音乐标题" width="300">
				<template scope="scope">
					<div @click="nameSearch(scope.row)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
					{{ scope.row.name }}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="ar[0].name" label="歌手" width="100">
				<template scope="scope">
					<div @click="singerSearch(scope.row)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
						{{ scope.row.ar[0].name }}
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="al.name" label="专辑" >
				<template scope="scope">
					<div @click="rePeoplemessageCard(scope.row)">{{ scope.row.al.name }}</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<div @click="play(scope.row)">
						<i :class="platState"></i>
					</div>
				</template>
			</el-table-column>
			<!-- <el-table-column label="" width="50">
				<template slot-scope="scope">
					<div v-if="scope.row.mv !== 0" @click="playMv(scope.row.mv)">
						<i :class="platState1"></i>
					</div>
				</template>
			</el-table-column> -->
		</el-table>
	</div>

</template>

<script>
	export default {
		props: ['pList','urList'],
		data() {
			return {
				musicurl: "",
				platState: "el-icon-video-play",
				platState1: "el-icon-monitor",
				isChange: false
			}
		},
		methods: {
			cli: function() {
				console.log(1)
			},
			rePeoplemessageCard(val) {
				// console.log(val)
				this.axios.get("/apisong/url?id=" + val.id)
					.then((res) => {
						// console.log(res.data)
						this.musicurl = res.data.data[0].url
						this.$emit("giveUrl",this.musicurl)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			playMv(val){
				// console.log(val)
				this.$router.push({
					name: 'mvPlay',
					params: {
						name : this.searchName
					}
				})
			},
			change: function() {
				this.isChange = !this.isChange
			},
			// play(val) {
			// 	console.log(val)
			// 		this.$emit("giveUrl", this.musicUrl)
			// 		console.log(this.musicUrl)
			// },
			nameSearch: function(val) {
				// console.log(val)
				this.axios.get("/api/cloudsearch?keywords=" + val.name + "&limit=50")
					.then((res) => {
						console.log(res.data.result.songs)
						this.searchList = res.data.result.songs
						this.$emit("serchSongs", this.searchList)
						this.songsId = this.songsId + 1
						this.$router.replace
						this.$router.push({
							name: 'Six',
							params: {
								result: this.searchList,
								// bool: this.value,
								// bool2: this.value2
							},
							query: {
								id: this.songsId
							}
						})
					})
					.catch((err) => {
						console.log(err)
					})
			},
			singerSearch:function(val){
				// console.log(val)
				this.$router.push({
					name: 'Info',
					params:{
						sigName : val.ar[0].id,
					}
				})
			},
		},
		mounted() {	
			
		}
	}
</script>

<style>
	.el-table {
		background-color: #31362a;
	}

	.el-table td,
	.el-table th {
		background-color: #31362a;
		color: #00b8b8;
	}
	.changeColor {
		color: #00e8e8;
		/* cursor: url(../assets/mouse.jpg),auto; */
	}
</style>
