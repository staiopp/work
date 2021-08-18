<template>
	<div style="float: left;width: 1000px;">
		<i class="el-icon-back" style="font-size: 20px; color: ghostwhite;float: left;" @click="fanhui"></i>
		<div class="img-head">
			<img :src="imgUrl" style="width: 200px;height: 200px" />
			<div style="color: #00FFFF;text-align: center;float: none;width: 200px;">{{name}}</div>
			<div style="color: #00FFFF;text-align: center;float: none;width: 200px;">{{type}}</div>
		</div>
		<div style="float: left;margin-left: 300px;margin-top: -480px;">
			<div style="width: 600px;height: 150px; border: 1px solid pink;margin-bottom: 30px;">
				<span style="color: #00FFFF;">简介</span>
				<hr />
				<div style="height: 110px;color: #00d3d3;font-size: 13px;text-align-last: left;text-indent: 30px;overflow-y: scroll;">
				{{ introduction }}
				</div>
			</div>
			<el-table :data="hotList" style="width: 100%" height="250">
				<el-table-column prop="name" label="音乐标题" width="300">
					<template scope="scope">
						<span @click="nameSearch(scope.row)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
							{{ scope.row.name }}
						</span>
					</template>
				</el-table-column>
				<el-table-column prop="ar[0].name" label="歌手" width="100">
					<template scope="scope">
						<div v-for="index in scope.row.ar.length">
							<span>
								{{ scope.row.ar[index-1].name }}
							</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="al.name" label="专辑" >
					<template scope="scope">
						<span @click="nameSearch(scope.row.al)" @mouseover="change" @mouseleave="change" :class="{changeColor : isChange}">
							{{ scope.row.al.name }}
						</span>
						<!-- <div>{{ scope.row.al.name }}</div> -->
					</template>
				</el-table-column>
				<el-table-column label="操作" width="50">
					<template slot-scope="scope">
						<div @click="play(scope.row)">
						<i :class="platState"></i>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="" width="50">
					<template slot-scope="scope">
						<div v-if="scope.row.mv !== 0" @click="playMv(scope.row)">
							<i :class="platState1"></i>
						</div>
					</template>
				</el-table-column>
			</el-table>
			</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				imgUrl : "",
				platState: "el-icon-video-play",
				platState1: "el-icon-monitor",
				sigName : "",
				sigList : [],
				hotList : [],
				name : "",
				introduction : "",
				type : "",
				keyNum : 7,
				isChange: false,
				musicUrl: ""
			}
		},
		mounted() {
			console.log(this.$route)
			this.sigName = this.$route.params.sigName
			this.axios.get("/api/artist/detail?id=" + this.sigName)
				.then((res) => {
					console.log(res.data.data)
					this.sigList = res.data.data.artist
					this.type = res.data.data.user.description
				})
				.catch((err) => {
					console.log(err)
				})
			this.axios.get("/api/artists?id=" + this.sigName)
				.then((res) => {
					console.log(res.data)
					this.hotList = res.data.hotSongs
					this.imgUrl = res.data.artist.picUrl
					this.name = res.data.artist.name
					this.introduction = res.data.artist.briefDesc
					
				})
				.catch((err) => {
					console.log(err)
				})
		},
		methods:{
			fanhui:function(){
				console.log("fanhui")
				this.$router.go(-3)
			},
			playMv(val){
				console.log(val)
				this.$router.push({
					name: 'mvPlay',
					params: {
						name : this.keyNum,
						id : val.mv,
						musicName : val.name,
						singerName : val.ar,
						imgUrl : val.al.picUrl,
						alName : val.al.name
					}
				})
			},
			play(val) {
				console.log(val)
				this.axios.get("/api/song/url?id=" + val.id)
					.then((res) => {
						// console.log(res.data)
						this.musicUrl = res.data.data[0].url
						this.$emit("giveUrl", this.musicUrl)
						console.log(this.musicUrl)
					})
					.catch((err) => {
						console.log(err)
					})
			},
			nameSearch: function(val) {
				console.log(val)
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
			change: function() {
				this.isChange = !this.isChange
			}
		}
	}
</script>

<style scoped="scoped">
	.music-info {
			width: 1000px;
	/* 		border: 1px solid pink; */
			height: 350px;
			margin-top: 0;
		}
	.img-head {
		width: 150px;
		height: 500px;
		/* border: 1px solid pink; */
		margin-left: 40px;
		margin-top: 0px;
		/* float: left; */
	}
	.changeColor {
		color: #00e8e8;
		/* cursor: url(../assets/mouse.jpg),auto; */
	}
</style>
